from django.urls import path
from . import views

urlpatterns = [
    path('staffs/', views.Staffs.as_view()),
    path('staff/', views.SingleStaff.as_view()),
]
