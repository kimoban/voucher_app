from django.contrib import admin
from .models import VoucherType, Voucher, VoucherUsage, VoucherDiscount


@admin.register(VoucherType)
class VoucherTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'type_code', 'price', 'validity_days', 'usage_limit', 'is_active']
    list_filter = ['is_active', 'type_code', 'created_at']
    search_fields = ['name', 'type_code']
    ordering = ['name']


@admin.register(Voucher)
class VoucherAdmin(admin.ModelAdmin):
    list_display = ['code', 'voucher_type', 'user', 'status', 'usage_count', 'issued_at', 'expires_at']
    list_filter = ['status', 'voucher_type', 'issued_at']
    search_fields = ['code', 'user__email', 'user__username']
    readonly_fields = ['id', 'code', 'issued_at']
    ordering = ['-issued_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'voucher_type')


@admin.register(VoucherUsage)
class VoucherUsageAdmin(admin.ModelAdmin):
    list_display = ['voucher', 'user', 'service_type', 'used_at']
    list_filter = ['service_type', 'used_at']
    search_fields = ['voucher__code', 'user__email', 'service_type']
    readonly_fields = ['used_at']
    ordering = ['-used_at']


@admin.register(VoucherDiscount)
class VoucherDiscountAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_type', 'discount_value', 'current_uses', 'max_uses', 'is_active']
    list_filter = ['discount_type', 'is_active', 'valid_from', 'valid_until']
    search_fields = ['code', 'description']
    filter_horizontal = ['applicable_types']
    ordering = ['-created_at']
