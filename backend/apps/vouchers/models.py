from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid
import secrets
import string

User = get_user_model()


class VoucherType(models.Model):
    """Different types of vouchers available"""
    
    RESULT_CHECK = 'result_check'
    SCHOOL_APPLICATION = 'school_application'
    PLACEMENT_APPLICATION = 'placement_application'
    CERTIFICATE_VERIFICATION = 'certificate_verification'
    TRANSCRIPT_REQUEST = 'transcript_request'
    
    TYPE_CHOICES = [
        (RESULT_CHECK, 'Result Check'),
        (SCHOOL_APPLICATION, 'School Application'),
        (PLACEMENT_APPLICATION, 'Placement Application'),
        (CERTIFICATE_VERIFICATION, 'Certificate Verification'),
        (TRANSCRIPT_REQUEST, 'Transcript Request'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    type_code = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    is_active = models.BooleanField(default=True)
    validity_days = models.PositiveIntegerField(default=30)
    usage_limit = models.PositiveIntegerField(default=1, help_text="Number of times voucher can be used")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'voucher_types'
        verbose_name = 'Voucher Type'
        verbose_name_plural = 'Voucher Types'
    
    def __str__(self):
        return f"{self.name} - ${self.price}"


class Voucher(models.Model):
    """Individual voucher instances"""
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('used', 'Used'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voucher_type = models.ForeignKey(VoucherType, on_delete=models.CASCADE, related_name='vouchers')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vouchers')
    code = models.CharField(max_length=20, unique=True, db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Usage tracking
    usage_count = models.PositiveIntegerField(default=0)
    last_used_at = models.DateTimeField(null=True, blank=True)
    
    # Dates
    issued_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    
    # Transaction reference
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    
    # Additional metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    class Meta:
        db_table = 'vouchers'
        verbose_name = 'Voucher'
        verbose_name_plural = 'Vouchers'
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['voucher_type', 'status']),
        ]
    
    def __str__(self):
        return f"{self.code} - {self.voucher_type.name}"
    
    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_voucher_code()
        
        if not self.expires_at:
            self.expires_at = timezone.now() + timezone.timedelta(days=self.voucher_type.validity_days)
        
        super().save(*args, **kwargs)
    
    @staticmethod
    def generate_voucher_code(length=12):
        """Generate a random voucher code"""
        characters = string.ascii_uppercase + string.digits
        return ''.join(secrets.choice(characters) for _ in range(length))
    
    @property
    def is_valid(self):
        """Check if voucher is valid for use"""
        return (
            self.status == 'active' and
            timezone.now() <= self.expires_at and
            self.usage_count < self.voucher_type.usage_limit
        )
    
    @property
    def days_until_expiry(self):
        """Days until voucher expires"""
        if self.expires_at:
            delta = self.expires_at - timezone.now()
            return max(0, delta.days)
        return 0
    
    def use_voucher(self, metadata=None):
        """Mark voucher as used"""
        if not self.is_valid:
            raise ValueError("Voucher is not valid for use")
        
        self.usage_count += 1
        self.last_used_at = timezone.now()
        
        if self.usage_count >= self.voucher_type.usage_limit:
            self.status = 'used'
        
        if metadata:
            self.metadata.update(metadata)
        
        self.save()


class VoucherUsage(models.Model):
    """Track voucher usage history"""
    
    voucher = models.ForeignKey(Voucher, on_delete=models.CASCADE, related_name='usage_history')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service_type = models.CharField(max_length=100)
    service_data = models.JSONField(default=dict)
    used_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    
    class Meta:
        db_table = 'voucher_usage'
        verbose_name = 'Voucher Usage'
        verbose_name_plural = 'Voucher Usage'
        indexes = [
            models.Index(fields=['voucher', 'used_at']),
            models.Index(fields=['user', 'used_at']),
        ]
    
    def __str__(self):
        return f"{self.voucher.code} used for {self.service_type}"


class VoucherDiscount(models.Model):
    """Discount codes and promotional vouchers"""
    
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    discount_type = models.CharField(
        max_length=20,
        choices=[('percentage', 'Percentage'), ('fixed', 'Fixed Amount')],
        default='percentage'
    )
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Applicable voucher types
    applicable_types = models.ManyToManyField(VoucherType, blank=True)
    
    # Usage limits
    max_uses = models.PositiveIntegerField(null=True, blank=True)
    current_uses = models.PositiveIntegerField(default=0)
    max_uses_per_user = models.PositiveIntegerField(default=1)
    
    # Date constraints
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'voucher_discounts'
        verbose_name = 'Voucher Discount'
        verbose_name_plural = 'Voucher Discounts'
    
    def __str__(self):
        return f"{self.code} - {self.discount_value}{'%' if self.discount_type == 'percentage' else '$'}"
    
    @property
    def is_valid(self):
        """Check if discount is currently valid"""
        now = timezone.now()
        return (
            self.is_active and
            self.valid_from <= now <= self.valid_until and
            (self.max_uses is None or self.current_uses < self.max_uses)
        )
