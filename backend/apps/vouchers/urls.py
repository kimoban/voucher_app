from django.urls import path
from . import views

urlpatterns = [
    path('types/', views.VoucherTypeListView.as_view(), name='voucher-types'),
    path('my-vouchers/', views.UserVouchersListView.as_view(), name='user-vouchers'),
    path('purchase/', views.purchase_voucher, name='purchase-voucher'),
    path('redeem/', views.redeem_voucher, name='redeem-voucher'),
    path('detail/<str:code>/', views.voucher_detail, name='voucher-detail'),
    path('stats/', views.user_voucher_stats, name='user-voucher-stats'),
    path('usage-history/', views.UserVoucherUsageListView.as_view(), name='voucher-usage-history'),
]
