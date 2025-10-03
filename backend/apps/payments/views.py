import stripe
from stripe.error import APIError as StripeError  # type: ignore # If this fails, use: from stripe.error import APIError as StripeError
from django.conf import settings
from django.utils import timezone
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction

from .models import Payment, PaymentVoucher, Refund
from .serializers import (
    PaymentSerializer, PaymentIntentSerializer, 
    RefundRequestSerializer, RefundSerializer
)
from apps.vouchers.models import VoucherType, Voucher, VoucherDiscount

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


class PaymentHistoryView(generics.ListAPIView):
    """List user's payment history"""
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    from django.db.models.query import QuerySet

    def get_queryset(self) -> 'QuerySet': # type: ignore
        return Payment.objects.filter(
            user=self.request.user
        ).select_related('voucher_type').order_by('-created_at')


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_payment_intent(request):
    """Create a payment intent for voucher purchase"""
    serializer = PaymentIntentSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = serializer.validated_data
    voucher_type_id = validated_data.get('voucher_type_id') # type: ignore
    quantity = validated_data.get('quantity') # type: ignore
    discount_code = validated_data.get('discount_code') # type: ignore
    payment_method = validated_data.get('payment_method') # type: ignore
    currency = validated_data.get('currency', 'usd') # type: ignore
    
    voucher_type = get_object_or_404(VoucherType, id=voucher_type_id, is_active=True)
    
    # Calculate total amount
    if quantity is None:
        return Response({'error': 'Quantity is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        quantity = int(quantity)
    except (TypeError, ValueError):
        return Response({'error': 'Quantity must be an integer'}, status=status.HTTP_400_BAD_REQUEST)
    amount = voucher_type.price * quantity
    discount_amount = 0
    
    # Apply discount if provided
    if discount_code:
        try:
            discount = VoucherDiscount.objects.get(code=discount_code, is_active=True)
            if discount.is_valid and voucher_type in discount.applicable_types.all():
                if discount.discount_type == 'percentage':
                    discount_amount = amount * (discount.discount_value / 100)
                else:
                    discount_amount = discount.discount_value
                
                amount -= discount_amount
        except VoucherDiscount.DoesNotExist:
            return Response({
                'error': 'Invalid discount code'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Create payment record
        payment = Payment.objects.create(
            user=request.user,
            amount=voucher_type.price,
            currency=currency,
            payment_method=payment_method,
            voucher_type=voucher_type,
            quantity=quantity,
            discount_amount=discount_amount,
            discount_code=discount_code
        )
        
        if payment_method == 'stripe':
            # Create Stripe payment intent
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Stripe uses cents
                currency=currency.lower(),
                metadata={
                    'payment_id': str(payment.id),
                    'user_id': str(request.user.id),
                    'voucher_type': voucher_type.name
                }
            )
            
            payment.stripe_payment_intent_id = intent.id
            payment.save()
            
            return Response({
                'payment_id': payment.id,
                'client_secret': intent.client_secret,
                'amount': float(amount),
                'currency': currency,
                'payment': PaymentSerializer(payment).data
            }, status=status.HTTP_201_CREATED)
        
        else:
            return Response({
                'error': 'Payment method not supported yet'
            }, status=status.HTTP_400_BAD_REQUEST)
    except StripeError as e:
        return Response({
            'error': f'Payment processor error: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'error': f'Internal error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def confirm_payment(request):
    """Confirm successful payment and create vouchers"""
    payment_intent_id = request.data.get('payment_intent_id')
    
    if not payment_intent_id:
        return Response({
            'error': 'Payment intent ID is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Retrieve payment intent from Stripe
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        if intent.status != 'succeeded':
            return Response({
                'error': 'Payment not successful'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Find the corresponding payment record
        payment = get_object_or_404(
            Payment, 
            stripe_payment_intent_id=payment_intent_id,
            user=request.user
        )
        
        if payment.status == 'completed':
            return Response({
                'error': 'Payment already processed'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        with transaction.atomic():
            # Update payment status
            payment.status = 'completed'
            payment.completed_at = timezone.now()
            payment.stripe_charge_id = str(intent.latest_charge) if intent.latest_charge else None
            payment.save()
            
            # Create vouchers
            vouchers = []
            for _ in range(payment.quantity):
                voucher = Voucher.objects.create(
                    voucher_type=payment.voucher_type,
                    user=payment.user,
                    transaction_id=str(payment.id)
                )
                
                # Link payment to voucher
                PaymentVoucher.objects.create(
                    payment=payment,
                    voucher=voucher
                )
                vouchers.append(voucher)
            
            # Update discount usage if applicable
            if payment.discount_code:
                try:
                    discount = VoucherDiscount.objects.get(code=payment.discount_code)
                    discount.current_uses += 1
                    discount.save()
                except VoucherDiscount.DoesNotExist:
                    pass
        
        return Response({
            'message': 'Payment confirmed and vouchers created',
            'payment': PaymentSerializer(payment).data,
            'voucher_codes': [v.code for v in vouchers]
        }, status=status.HTTP_200_OK)
    except StripeError as e:
        return Response({
            'error': f'Payment verification failed: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'error': f'Internal error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def request_refund(request):
    """Request a refund for a payment"""
    serializer = RefundRequestSerializer(data=request.data)
    
    if serializer.is_valid():
        payment_id = serializer.validated_data['payment_id'] # type: ignore
        reason = serializer.validated_data['reason'] # type: ignore
        amount = serializer.validated_data.get('amount', None) # type: ignore
        notes = serializer.validated_data.get('notes', '') # type: ignore
        
        payment = get_object_or_404(
            Payment, 
            id=payment_id, 
            user=request.user, 
            status='completed'
        )
        
        # Check if refund already exists
        if hasattr(payment, 'refund'):
            return Response({
                'error': 'Refund already requested for this payment'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Default refund amount to full payment amount
        if not amount:
            amount = payment.total_amount
        
        # Create refund record
        refund = Refund.objects.create(
            payment=payment,
            amount=amount,
            reason=reason,
            admin_notes=notes
        )
        
        return Response({
            'message': 'Refund request submitted successfully',
            'refund': RefundSerializer(refund).data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.db.models.query import QuerySet

class UserRefundsView(generics.ListAPIView):
    """List user's refund requests"""
    serializer_class = RefundSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self) -> QuerySet: # type: ignore
        return Refund.objects.filter(
            payment__user=self.request.user
        ).order_by('-created_at')
