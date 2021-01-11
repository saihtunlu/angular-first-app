from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    details = serializers.JSONField()

    class Meta:
        model = User
        fields = ['id', 'is_superuser', 'first_name',
                  'last_name', 'email', 'avatar', 'username', 'details']
