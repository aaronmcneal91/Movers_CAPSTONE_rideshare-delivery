from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import User
from client_type.models import Client_Type
from .serializer import UserSerializer
from client_type.serializer import CLientTypeSerializer 


@api_view (['GET', 'POST'])
@permission_classes([AllowAny])
def get_users(request):
    user = User.objects.all()
    if request.method == 'GET':
        serializer = UserSerializer(user, many= True)
        return Response (serializer.data)

    elif request.method =="POST":
        serializer = UserSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT', 'DELETE'])
@permission_classes([IsAuthenticated])

def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == 'GET':
        user = User.objects.filter(user_id=request.user.id)
        serializer = UserSerializer(user, many = False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

