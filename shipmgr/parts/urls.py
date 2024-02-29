from django.urls import path
from . import views

urlpatterns = [
    path('gltf', views.ImportGltfView.as_view()),
    path('', views.PartsView.as_view()),
    path('unity', views.UnityView.as_view()),
]