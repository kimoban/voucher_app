from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from .models import UserProfile
from .serializers import (
    UserSerializer, UserUpdateSerializer, 
    ChangePasswordSerializer, UserProfileSerializer
)

User = get_user_model()


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self): # type: ignore
        return self.request.user


class UpdateUserProfileView(generics.UpdateAPIView):
    """Update user profile information"""
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self): # type: ignore
        return self.request.user


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    """Change user password"""
    serializer = ChangePasswordSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    old_password = serializer.validated_data.get('old_password') # type: ignore
    new_password = serializer.validated_data.get('new_password') # type: ignore
    
    if not old_password or not new_password:
        return Response(
            {'error': 'Old password and new password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not check_password(old_password, user.password):
        return Response(
            {'error': 'Old password is incorrect.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user.set_password(new_password)
    user.save()
    
    return Response(
        {'message': 'Password changed successfully.'}, 
        status=status.HTTP_200_OK
    )


class UserProfileDetailView(generics.RetrieveUpdateAPIView):
    """Get and update extended user profile"""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self): # type: ignore
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile
