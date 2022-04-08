from django.db import models
from client_type.models import Client_Type


class Client(models.Model):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    address = models.CharField(max_length= 250)
  
    client_type = models.ForeignKey(Client_Type, on_delete=models.CASCADE)

    def __str__(self):
        return self.last_name, self.first_name
