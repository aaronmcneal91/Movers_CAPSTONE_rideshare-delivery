from django.db import models
from client_type.models import Client_Type
from django.contrib.auth.models import User



class Client(models.Model):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    address = models.CharField(max_length= 250)
    type = models.ForeignKey(Client_Type, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE )
    

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

