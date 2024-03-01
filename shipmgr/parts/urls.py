from django.urls import path
from . import views

urlpatterns = [
    path('gltf', views.ImportGltfView.as_view()),
    path('', views.PartsView.as_view()),
    path('single', views.GetPartPropView.as_view()),
    path('unity', views.UnityView.as_view()),
    path('bigdata', views.BigDataView.as_view()),
]
