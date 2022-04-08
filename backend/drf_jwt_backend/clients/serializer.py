from rest_framework import serializers
from.models import Client
from .models import Client_Type

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name', 'email', 'address', 'client_type_id']
        depth = 1
    client_type_id = serializers.IntegerField(write_only=True)
    