from django.urls import path
from . import views

urlpatterns = [
    path('update', views.UpdateScheduleView.as_view()),
    path('nodes', views.GetNodesView.as_view()),
]