from django.urls import path, include
from . import views


urlpatterns =[
    path('users/', views.get_users),
    path('users/<int:pk>/', views.user_detail),
]