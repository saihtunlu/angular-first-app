
from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('attendance/', views.Detect.as_view()),
    path('attendances/', views.Attendances.as_view()),
]
