from django.contrib import admin
from clients.models import Client
from .models import Client_Type

admin.site.register(Client)
admin.site.register(Client_Type)