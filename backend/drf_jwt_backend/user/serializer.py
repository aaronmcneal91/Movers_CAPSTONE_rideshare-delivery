from rest_framework import serializers
from .models import User
from .models import Client_Type
from client_type.serializer import CLientTypeSerializer


class UserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'address', 'type', 'type_id']
        depth = 1
    type_id = serializers.IntegerField(write_only=True)
 
    