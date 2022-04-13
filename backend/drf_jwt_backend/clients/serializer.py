from rest_framework import serializers
from .models import Client
from .models import Client_Type
from client_type.serializer import CLientTypeSerializer


class ClientSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name', 'email', 'address', 'type', 'type_id']
        depth = 1
    type_id = serializers.IntegerField(write_only=True)
 
    