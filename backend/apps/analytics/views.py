from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg, Q
from django.utils import timezone
from datetime import timedelta

from apps.vouchers.models import Voucher, VoucherType, VoucherUsage
from apps.payments.models import Payment
from apps.users.models import User


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def admin_dashboard_stats(request):
    """Get comprehensive dashboard statistics for admin"""
    
    # Date filters
    today = timezone.now().date()
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)
    
    # User statistics
    total_users = User.objects.count()
    new_users_week = User.objects.filter(date_joined__date__gte=week_ago).count()
    active_users_month = User.objects.filter(last_login__date__gte=month_ago).count()
    
    # Voucher statistics
    total_vouchers = Voucher.objects.count()
    active_vouchers = Voucher.objects.filter(status='active').count()
    used_vouchers = Voucher.objects.filter(status='used').count()
    expired_vouchers = Voucher.objects.filter(status='expired').count()
    
    # Recent voucher activity
    vouchers_issued_week = Voucher.objects.filter(issued_at__date__gte=week_ago).count()
    vouchers_used_week = VoucherUsage.objects.filter(used_at__date__gte=week_ago).count()
    
    # Payment statistics
    total_revenue = Payment.objects.filter(status='completed').aggregate(
        total=Sum('amount')
    )['total'] or 0
    
    revenue_week = Payment.objects.filter(
        status='completed',
        completed_at__date__gte=week_ago
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    revenue_month = Payment.objects.filter(
        status='completed',
        completed_at__date__gte=month_ago
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    # Voucher type popularity
    voucher_type_stats = VoucherType.objects.annotate(
        total_purchased=Count('voucher'),
        total_used=Count('voucher__usage_history'),
        total_revenue=Sum('voucher__payment_record__amount')
    ).order_by('-total_purchased')
    
    voucher_types_data = []
    for vt in voucher_type_stats:
        voucher_types_data.append({
            'name': vt.name,
            'type_code': vt.type_code,
            'total_purchased': vt.total_purchased, # type: ignore
            'total_used': vt.total_used, # type: ignore
            'revenue': float(vt.total_revenue or 0), # type: ignore
            'price': float(vt.price)
        })
    
    # Recent activity summary
    recent_payments = Payment.objects.filter(
        completed_at__date__gte=week_ago
    ).count()
    
    return Response({
        'users': {
            'total': total_users,
            'new_this_week': new_users_week,
            'active_this_month': active_users_month
        },
        'vouchers': {
            'total': total_vouchers,
            'active': active_vouchers,
            'used': used_vouchers,
            'expired': expired_vouchers,
            'issued_this_week': vouchers_issued_week,
            'used_this_week': vouchers_used_week
        },
        'revenue': {
            'total': float(total_revenue),
            'this_week': float(revenue_week),
            'this_month': float(revenue_month)
        },
        'voucher_types': voucher_types_data,
        'recent_activity': {
            'payments_this_week': recent_payments,
            'vouchers_issued_this_week': vouchers_issued_week,
            'vouchers_used_this_week': vouchers_used_week
        }
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_analytics(request):
    """Get analytics for the current user"""
    
    user = request.user
    
    # User's voucher statistics
    user_vouchers = Voucher.objects.filter(user=user)
    total_vouchers = user_vouchers.count()
    active_vouchers = user_vouchers.filter(status='active').count()
    used_vouchers = user_vouchers.filter(status='used').count()
    expired_vouchers = user_vouchers.filter(status='expired').count()
    
    # User's spending
    total_spent = Payment.objects.filter(
        user=user,
        status='completed'
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    # Usage by voucher type
    usage_by_type = VoucherUsage.objects.filter(
        user=user
    ).values(
        'voucher__voucher_type__name',
        'voucher__voucher_type__type_code'
    ).annotate(
        usage_count=Count('id')
    ).order_by('-usage_count')
    
    # Recent activity
    recent_vouchers = user_vouchers.order_by('-issued_at')[:5]
    recent_usage = VoucherUsage.objects.filter(
        user=user
    ).select_related('voucher').order_by('-used_at')[:5]
    
    recent_vouchers_data = []
    for voucher in recent_vouchers:
        recent_vouchers_data.append({
            'code': voucher.code,
            'type': voucher.voucher_type.name,
            'status': voucher.status,
            'issued_at': voucher.issued_at,
            'expires_at': voucher.expires_at
        })
    
    recent_usage_data = []
    for usage in recent_usage:
        recent_usage_data.append({
            'voucher_code': usage.voucher.code,
            'service_type': usage.service_type,
            'used_at': usage.used_at
        })
    
    return Response({
        'voucher_summary': {
            'total': total_vouchers,
            'active': active_vouchers,
            'used': used_vouchers,
            'expired': expired_vouchers
        },
        'spending': {
            'total': float(total_spent),
            'average_per_voucher': float(total_spent / total_vouchers) if total_vouchers > 0 else 0
        },
        'usage_by_type': list(usage_by_type),
        'recent_vouchers': recent_vouchers_data,
        'recent_usage': recent_usage_data
    })


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def revenue_analytics(request):
    """Get detailed revenue analytics"""
    
    # Get date range from query params
    days = int(request.query_params.get('days', 30))
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=days)
    
    # Daily revenue for the period
    daily_revenue = Payment.objects.filter(
        status='completed',
        completed_at__date__gte=start_date,
        completed_at__date__lte=end_date
    ).extra(
        select={'day': 'date(completed_at)'}
    ).values('day').annotate(
        revenue=Sum('amount'),
        payment_count=Count('id')
    ).order_by('day')
    
    # Revenue by voucher type
    revenue_by_type = Payment.objects.filter(
        status='completed',
        completed_at__date__gte=start_date
    ).values(
        'voucher_type__name',
        'voucher_type__type_code'
    ).annotate(
        revenue=Sum('amount'),
        quantity=Sum('quantity')
    ).order_by('-revenue')
    
    # Payment method statistics
    payment_methods = Payment.objects.filter(
        status='completed',
        completed_at__date__gte=start_date
    ).values('payment_method').annotate(
        count=Count('id'),
        revenue=Sum('amount')
    ).order_by('-revenue')
    
    return Response({
        'period': {
            'start_date': start_date,
            'end_date': end_date,
            'days': days
        },
        'daily_revenue': list(daily_revenue),
        'revenue_by_type': list(revenue_by_type),
        'payment_methods': list(payment_methods),
        'summary': {
            'total_revenue': sum(item['revenue'] for item in daily_revenue),
            'total_payments': sum(item['payment_count'] for item in daily_revenue),
            'average_daily_revenue': sum(item['revenue'] for item in daily_revenue) / days if days > 0 else 0
        }
    })
