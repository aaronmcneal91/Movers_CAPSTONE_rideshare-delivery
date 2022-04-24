from django.urls import path, include
from . import views


urlpatterns =[
    path('trips', views.get_trips),
    path('trips/clients/<int:pk>', views.client_trips), 
    path('trips/drivers/<int:pk>', views.driver_trips)
]