from django.urls import path
from . import views

urlpatterns = [
    path('types/', views.VoucherTypeListView.as_view(), name='voucher-types'),
    # Add other voucher URLs here
]