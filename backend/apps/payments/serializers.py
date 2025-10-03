from rest_framework import serializers
from .models import Payment, Refund
from apps.vouchers.serializers import VoucherTypeSerializer


class PaymentSerializer(serializers.ModelSerializer):
    voucher_type = VoucherTypeSerializer(read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'amount', 'currency', 'status', 'payment_method',
            'voucher_type', 'quantity', 'discount_amount', 'discount_code',
            'total_amount', 'created_at', 'updated_at', 'completed_at'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at', 'completed_at']


class PaymentIntentSerializer(serializers.Serializer):
    voucher_type_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, max_value=10, default=1)
    discount_code = serializers.CharField(required=False, allow_blank=True)
    payment_method = serializers.CharField(default='stripe')
    currency = serializers.CharField(default='USD')


class RefundRequestSerializer(serializers.Serializer):
    payment_id = serializers.UUIDField()
    reason = serializers.ChoiceField(choices=Refund.REASON_CHOICES)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    notes = serializers.CharField(required=False, allow_blank=True)


class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = [
            'id', 'amount', 'reason', 'status', 'admin_notes',
            'created_at', 'processed_at'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'processed_at']
