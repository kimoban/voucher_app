from django.urls import path
from . import views

urlpatterns = [
    path('history/', views.PaymentHistoryView.as_view(), name='payment-history'),
    path('create-intent/', views.create_payment_intent, name='create-payment-intent'),
    path('confirm/', views.confirm_payment, name='confirm-payment'),
    path('refund/request/', views.request_refund, name='request-refund'),
    path('refunds/', views.UserRefundsView.as_view(), name='user-refunds'),
]
