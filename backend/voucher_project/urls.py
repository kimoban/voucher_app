"""
URL configuration for voucher_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

def test_view(request):
    return JsonResponse({"message": "Backend is working!", "status": "success"})

def health_check(request):
    return JsonResponse({"status": "healthy", "django": "running"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test/', test_view, name='test'),
    path('api/health/', health_check, name='health'),
    
    # API endpoints
    path('api/auth/', include('apps.authentication.urls')),
    path('api/vouchers/', include('apps.vouchers.urls')),
    path('api/payments/', include('apps.payments.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
    path('api/users/', include('apps.authentication.urls')),  # Alias for user endpoints
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
