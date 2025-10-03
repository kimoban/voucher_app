from rest_framework import serializers
from .models import VoucherType, Voucher, VoucherUsage, VoucherDiscount
from django.utils import timezone


class VoucherTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoucherType
        fields = [
            'id', 'name', 'type_code', 'description', 'price',
            'is_active', 'validity_days', 'usage_limit',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class VoucherSerializer(serializers.ModelSerializer):
    voucher_type = VoucherTypeSerializer(read_only=True)
    voucher_is_valid = serializers.SerializerMethodField()
    days_until_expiry = serializers.IntegerField(read_only=True)

    def get_voucher_is_valid(self, obj):
        return obj.is_valid

    class Meta:
        model = Voucher
        fields = [
            'id', 'voucher_type', 'code', 'status', 'usage_count',
            'last_used_at', 'issued_at', 'expires_at', 'voucher_is_valid',
            'days_until_expiry', 'metadata'
        ]
        read_only_fields = [
            'id', 'code', 'usage_count', 'last_used_at',
            'issued_at', 'expires_at', 'voucher_is_valid', 'days_until_expiry'
        ]


class VoucherPurchaseSerializer(serializers.Serializer):
    voucher_type_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, max_value=10, default=1)
    discount_code = serializers.CharField(required=False, allow_blank=True)
    
    def validate_voucher_type_id(self, value):
        try:
            voucher_type = VoucherType.objects.get(id=value, is_active=True)
        except VoucherType.DoesNotExist:
            raise serializers.ValidationError("Invalid or inactive voucher type.")
        return value
    
    def validate_discount_code(self, value):
        if value:
            try:
                discount = VoucherDiscount.objects.get(code=value, is_active=True)
                if not discount.is_valid:
                    raise serializers.ValidationError("Discount code is not valid or has expired.")
            except VoucherDiscount.DoesNotExist:
                raise serializers.ValidationError("Invalid discount code.")
        return value


class VoucherRedemptionSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=20)
    service_type = serializers.CharField(max_length=100)
    service_data = serializers.JSONField(default=dict)
    
    def validate_code(self, value):
        try:
            voucher = Voucher.objects.get(code=value.upper())
            if not voucher.is_valid:
                raise serializers.ValidationError("Voucher is not valid or has expired.")
        except Voucher.DoesNotExist:
            raise serializers.ValidationError("Invalid voucher code.")
        return value.upper()


class VoucherUsageSerializer(serializers.ModelSerializer):
    voucher_code = serializers.CharField(source='voucher.code', read_only=True)
    voucher_type_name = serializers.CharField(source='voucher.voucher_type.name', read_only=True)
    
    class Meta:
        model = VoucherUsage
        fields = [
            'id', 'voucher_code', 'voucher_type_name', 'service_type',
            'service_data', 'used_at', 'ip_address'
        ]
        read_only_fields = ['id', 'used_at']


class VoucherDiscountSerializer(serializers.ModelSerializer):
    applicable_types = VoucherTypeSerializer(many=True, read_only=True)
    is_valid_field = serializers.SerializerMethodField()
    
    def get_is_valid_field(self, obj):
        return obj.is_valid

    class Meta:
        model = VoucherDiscount
        fields = [
            'id', 'code', 'description', 'discount_type', 'discount_value',
            'applicable_types', 'max_uses', 'current_uses', 'max_uses_per_user',
            'valid_from', 'valid_until', 'is_active', 'is_valid_field', 'created_at'
        ]
        read_only_fields = ['id', 'current_uses', 'is_valid_field', 'created_at']


class VoucherStatsSerializer(serializers.Serializer):
    total_vouchers = serializers.IntegerField()
    active_vouchers = serializers.IntegerField()
    used_vouchers = serializers.IntegerField()
    expired_vouchers = serializers.IntegerField()
    total_value = serializers.DecimalField(max_digits=10, decimal_places=2)
