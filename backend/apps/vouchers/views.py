from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from django.utils import timezone
from django.shortcuts import get_object_or_404

from .models import VoucherType, Voucher, VoucherUsage, VoucherDiscount
from .serializers import (
    VoucherTypeSerializer, VoucherSerializer, VoucherPurchaseSerializer,
    VoucherRedemptionSerializer, VoucherUsageSerializer, VoucherStatsSerializer
)


class VoucherTypeListView(generics.ListAPIView):
    """List all active voucher types"""
    serializer_class = VoucherTypeSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self): # type: ignore
        return VoucherType.objects.filter(is_active=True)


class UserVouchersListView(generics.ListAPIView):
    """List user's vouchers"""
    serializer_class = VoucherSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    from typing import Any
    from django.db.models.query import QuerySet

    def get_queryset(self) -> 'QuerySet[Voucher]': # type: ignore
        status_filter = self.request.GET.get('status')
        queryset = Voucher.objects.filter(user=self.request.user).select_related('voucher_type')
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-issued_at')


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def purchase_voucher(request):
    """Purchase voucher endpoint"""
    serializer = VoucherPurchaseSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    voucher_type_id = serializer.validated_data['voucher_type_id'] # type: ignore
    quantity = serializer.validated_data['quantity'] # type: ignore
    discount_code = serializer.validated_data.get('discount_code') # type: ignore
    
    voucher_type = get_object_or_404(VoucherType, id=voucher_type_id, is_active=True)
    
    # Calculate total price
    total_price = voucher_type.price * quantity
    
    # Apply discount if provided
    discount_amount = 0
    if discount_code:
        try:
            discount = VoucherDiscount.objects.get(code=discount_code, is_active=True)
            if discount.is_valid and voucher_type in discount.applicable_types.all():
                if discount.discount_type == 'percentage':
                    discount_amount = total_price * (discount.discount_value / 100)
                else:
                    discount_amount = discount.discount_value
                
                total_price -= discount_amount
        except VoucherDiscount.DoesNotExist:
            pass
    
    # This would integrate with your payment system
    # For now, we'll assume payment is successful and create vouchers
    
    vouchers = []
    for _ in range(quantity):
        voucher = Voucher.objects.create(
            voucher_type=voucher_type,
            user=request.user,
            # In real implementation, add transaction_id from payment processor
        )
        vouchers.append(voucher)
    
    return Response({
        'message': f'Successfully purchased {quantity} voucher(s)',
        'vouchers': VoucherSerializer(vouchers, many=True).data,
        'total_paid': float(total_price),
        'discount_applied': float(discount_amount)
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def redeem_voucher(request):
    """Redeem voucher endpoint"""
    serializer = VoucherRedemptionSerializer(data=request.data)
    
    if serializer.is_valid():
        validated_data = serializer.validated_data
        code = validated_data.get('code') # type: ignore
        service_type = validated_data.get('service_type') # type: ignore
        service_data = validated_data.get('service_data') # type: ignore
        
        try:
            voucher = Voucher.objects.get(code=code)
            
            if not voucher.is_valid:
                return Response({
                    'error': 'Voucher is not valid or has expired'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Use the voucher
            voucher.use_voucher()
            
            # Record usage
            usage = VoucherUsage.objects.create(
                voucher=voucher,
                user=request.user,
                service_type=service_type,
                service_data=service_data,
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
            
            return Response({
                'message': 'Voucher redeemed successfully',
                'voucher': VoucherSerializer(voucher).data,
                'usage': VoucherUsageSerializer(usage).data
            }, status=status.HTTP_200_OK)
            
        except Voucher.DoesNotExist:
            return Response({
                'error': 'Invalid voucher code'
            }, status=status.HTTP_400_BAD_REQUEST)
        except ValueError as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def voucher_detail(request, code):
    """Get voucher details by code"""
    try:
        voucher = Voucher.objects.select_related('voucher_type').get(
            code=code.upper(),
            user=request.user
        )
        return Response(VoucherSerializer(voucher).data)
    except Voucher.DoesNotExist:
        return Response({
            'error': 'Voucher not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_voucher_stats(request):
    """Get user's voucher statistics"""
    user_vouchers = Voucher.objects.filter(user=request.user)
    
    stats = {
        'total_vouchers': user_vouchers.count(),
        'active_vouchers': user_vouchers.filter(status='active').count(),
        'used_vouchers': user_vouchers.filter(status='used').count(),
        'expired_vouchers': user_vouchers.filter(status='expired').count(),
        'total_value': user_vouchers.aggregate(
            total=Sum('voucher_type__price')
        )['total'] or 0
    }
    
    serializer = VoucherStatsSerializer(stats)
    return Response(serializer.data)


class UserVoucherUsageListView(generics.ListAPIView):
    """List user's voucher usage history"""
    serializer_class = VoucherUsageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self): # type: ignore
        return VoucherUsage.objects.filter(
            user=self.request.user
        ).select_related('voucher', 'voucher__voucher_type').order_by('-used_at')
