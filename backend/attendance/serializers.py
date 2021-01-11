from rest_framework import serializers
from .models import Attendance
from staff.serializers import StaffSerializers


class AttendanceSerializers(serializers.ModelSerializer):
    staff = StaffSerializers(many=False, read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'staff', 'created_at', 'updated_at']
