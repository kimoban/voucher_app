from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.admin_dashboard_stats, name='admin-dashboard'),
    path('user/', views.user_analytics, name='user-analytics'),
    path('revenue/', views.revenue_analytics, name='revenue-analytics'),
]
