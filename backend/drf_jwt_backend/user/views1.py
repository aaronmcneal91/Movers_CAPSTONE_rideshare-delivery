# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.decorators import api_view, permission_classes
# from .models import Client
# from .models import Client_Type
# from .serializer import ClientSerializer


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_clients(request):
#     client = Client.objects.all()
#     serializer = ClientSerializer(client, many = True)
#     return Response(serializer.data)

# @api_view(['GET', 'POST'])
# @permission_classes([AllowAny])
# def get_id(request):
#     print(
#         'User ', f"{request.user.id} {request.user.password} ")
#     if request.method == 'POST':
#         serializer = ClientSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user =request.user)
#             return Response(serializer.data, status =status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'GET':
#         clients = Client.objects.filter(user_id=request.user.id)
#         serializer = ClientSerializer(clients, many=True)
#         return Response(serializer.data)