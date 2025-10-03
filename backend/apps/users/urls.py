from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('profile/update/', views.UpdateUserProfileView.as_view(), name='update-user-profile'),
    path('profile/extended/', views.UserProfileDetailView.as_view(), name='user-profile-extended'),
    path('change-password/', views.change_password, name='change-password'),
]
