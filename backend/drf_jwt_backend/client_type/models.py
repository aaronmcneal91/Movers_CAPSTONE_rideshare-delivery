from django.db import models

class Client_Type(models.Model):
    type = models.CharField(max_length=10)


