from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Trip
from .serializer import TripSerializer
from django.contrib.auth.models import User
from client_type.serializer import CLientTypeSerializer 
from clients.models import Client



@api_view (['GET', 'POST'])
@permission_classes([AllowAny])
def get_trips(request):
    trip = Trip.objects.all()
    if request.method == 'GET':
        serializer = TripSerializer(trip, many= True)
        return Response (serializer.data)

    elif request.method =="POST":
        serializer = TripSerializer(data=request.data)
        serializer.is_valid()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT', 'DELETE'])
@permission_classes([IsAuthenticated])

def client_trips(request, pk):
    if request.method == 'GET':
        trips = Trip.objects.filter(client_id=pk)
        serializer = TripSerializer(trips, many = True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        trip = get_object_or_404(Trip, pk=pk)
        serializer = TripSerializer(Trip, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
