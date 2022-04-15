from django.urls import path, include
from . import views


urlpatterns =[
    path('clients/', views.get_clients),
    path('clients/<int:pk>', views.clients_detail),
]