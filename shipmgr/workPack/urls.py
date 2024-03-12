from django.urls import path
from . import views

urlpatterns = [
    path('update', views.UpdateSchedule.as_view()),
]