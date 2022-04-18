from django.urls import path, include
from . import views


urlpatterns =[
    path('trips', views.get_trips),
    path('trips/<int:pk>', views.client_trips),
]