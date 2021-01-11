from .models import Staff
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from .serializers import StaffSerializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from app.pagination import Pagination

# Create your views here.


class Staffs(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StaffSerializers
    pagination_class = Pagination

    def get_queryset(self):
        return Staff.objects.all().order_by('-created_at')

    def get(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            result = self.get_paginated_response(serializer.data)
            data = result.data  # pagination data
        else:
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data
        return Response(data, status=status.HTTP_201_CREATED)


class SingleStaff(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        data = request.data
        staff = Staff()
        staff_serializer = StaffSerializers(staff, data=data)
        if staff_serializer.is_valid():
            staff_serializer.save()
            return Response(staff_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(staff_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        data = request.data['data']
        id = request.GET['staff_id']
        staff = get_object_or_404(
            Staff, id=id)
        staff_serializer = StaffSerializers(staff, data=data)
        if staff_serializer.is_valid():
            staff_serializer.save()
            return Response(staff_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(staff_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        id = request.GET['staff_id']
        staff = get_object_or_404(
            Staff, id=id)
        staff_serializer = StaffSerializers(staff, many=False)
        return Response(staff_serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        id = request.GET['staff_id']
        Staff.objects.get(pk=id).delete()
        return Response('Success', status=status.HTTP_201_CREATED)
