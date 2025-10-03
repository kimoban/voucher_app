from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'username', 'first_name', 'last_name', 'is_verified', 'date_joined']
    list_filter = ['is_verified', 'is_staff', 'is_active', 'date_joined']
    search_fields = ['email', 'username', 'first_name', 'last_name']
    ordering = ['-date_joined']
    
    fieldsets = list(BaseUserAdmin.fieldsets) + [
        ('Additional Info', {
            'fields': ('phone_number', 'date_of_birth', 'profile_picture', 'is_verified')
        }),
        ('Academic Info', {
            'fields': ('student_id', 'institution', 'graduation_year')
        }),
    ]


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'location', 'created_at']
    search_fields = ['user__email', 'user__username', 'location']
    list_filter = ['created_at']
