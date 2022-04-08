from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Client
from client_type.models import Client_Type
from .serializer import ClientSerializer


@api_view (['GET', 'POST'])
def get_clients(request):
    client = Client.objects.all()
    if request.method == 'GET':
        serializer = ClientSerializer(client, many= True)
        return Response (serializer.data)

    elif request.method =="POST":
        serializer = ClientSerializer(data=request.data)
        serializer.is_valid(raise_exception= True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT', 'DELETE'])
def clients_detail(request, pk):
    client = get_object_or_404(Client, pk=pk)
    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)
    elif request.method == 'PUT':
        client = get_object_or_404(Client, pk=pk)
        serializer = ClientSerializer(client, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

