from attendance.models import Attendance
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
import numpy as np
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from staff.models import Staff
from .serializers import AttendanceSerializers
import cv2
import os
import face_recognition
from datetime import datetime
from django.shortcuts import get_object_or_404

# define the path to the face detector
FACE_DETECTOR_PATH = "{base_path}/cascades/haarcascade_frontalface_default.xml".format(
    base_path=os.path.abspath(os.path.dirname(__file__)))


class Detect(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        path = 'media/staff/'
        images = []
        image = request.FILES["image"]

        classNames = []
        myList = os.listdir(path)
        for name in myList:
            curImg = cv2.imread(f'{path}/{name}')
            images.append(curImg)
            classNames.append(os.path.splitext(name)[0])

        def findEncodings(images):
            encodeList = []
            for img in images:
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                encode = face_recognition.face_encodings(img)[0]
                encodeList.append(encode)
            return encodeList
        encodeListKnown = findEncodings(images)

        image = face_recognition.load_image_file(image)
        imgS = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        facesCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)
        for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
            faceDis = face_recognition.face_distance(
                encodeListKnown, encodeFace)
            matchIndex = np.argmin(faceDis)
            if faceDis[matchIndex] < 0.45:
                name = classNames[matchIndex]
                staff = get_object_or_404(
                    Staff, slug=name)
                new_attendance = Attendance(staff=staff)
                new_attendance_serializer = AttendanceSerializers(
                    new_attendance, data={})
                if new_attendance_serializer.is_valid():
                    new_attendance_serializer.save()
                    return Response(new_attendance_serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(new_attendance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'details': 'No faces match!'}, status=status.HTTP_404_NOT_FOUND)


class Attendances(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        date = request.GET['date']
        attendances = Attendance.objects.filter(
            created_at__icontains=date)
        attendances_Serializers = AttendanceSerializers(
            attendances, many=True)
        return Response(attendances_Serializers.data, status=status.HTTP_201_CREATED)
