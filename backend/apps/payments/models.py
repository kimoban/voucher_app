from django.db import models
from django.contrib.auth import get_user_model
from apps.vouchers.models import VoucherType, Voucher
import uuid
from decimal import Decimal

User = get_user_model()


class Payment(models.Model):
    """Payment records for voucher purchases"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('bank_transfer', 'Bank Transfer'),
        ('mobile_money', 'Mobile Money'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    
    # Payment details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    currency = models.CharField(max_length=3, default='USD')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    
    # External payment processor references
    stripe_payment_intent_id = models.CharField(max_length=200, blank=True, null=True)
    stripe_charge_id = models.CharField(max_length=200, blank=True, null=True)
    paypal_order_id = models.CharField(max_length=200, blank=True, null=True)
    
    # Voucher-related information
    voucher_type = models.ForeignKey(VoucherType, on_delete=models.CASCADE)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    discount_code = models.CharField(max_length=50, blank=True, null=True)
    
    # Metadata
    metadata = models.JSONField(default=dict)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'payments'
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['stripe_payment_intent_id']),
        ]
    
    def __str__(self):
        return f"Payment {self.id} - {self.amount} {self.currency} - {self.status}"
    
    @property
    def total_amount(self):
        """Calculate total amount after discount"""
        return self.amount * self.quantity - self.discount_amount


class PaymentVoucher(models.Model):
    """Link payments to the vouchers they generated"""
    
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='vouchers')
    voucher = models.OneToOneField(Voucher, on_delete=models.CASCADE, related_name='payment_record')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'payment_vouchers'
        verbose_name = 'Payment Voucher'
        verbose_name_plural = 'Payment Vouchers'
    
    def __str__(self):
        return f"Payment {self.payment.id} -> Voucher {self.voucher.code}"


class Refund(models.Model):
    """Refund records"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]
    
    REASON_CHOICES = [
        ('customer_request', 'Customer Request'),
        ('duplicate_payment', 'Duplicate Payment'),
        ('fraudulent', 'Fraudulent'),
        ('system_error', 'System Error'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name='refund')
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.CharField(max_length=50, choices=REASON_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # External processor refund ID
    stripe_refund_id = models.CharField(max_length=200, blank=True, null=True)
    paypal_refund_id = models.CharField(max_length=200, blank=True, null=True)
    
    # Admin details
    processed_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='processed_refunds'
    )
    admin_notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'refunds'
        verbose_name = 'Refund'
        verbose_name_plural = 'Refunds'
    
    def __str__(self):
        return f"Refund {self.id} - {self.amount} - {self.status}"


class PaymentWebhook(models.Model):
    """Store webhook events from payment processors"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    processor = models.CharField(max_length=50)  # stripe, paypal, etc.
    event_id = models.CharField(max_length=200)
    event_type = models.CharField(max_length=100)
    event_data = models.JSONField()
    processed = models.BooleanField(default=False)
    error_message = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'payment_webhooks'
        verbose_name = 'Payment Webhook'
        verbose_name_plural = 'Payment Webhooks'
        unique_together = ['processor', 'event_id']
    
    def __str__(self):
        return f"{self.processor} - {self.event_type} - {self.event_id}"
