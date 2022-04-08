from django.db import models
from django_google_maps import fields as map_fields



class Trip_Plan(models.Model):
    location = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.location}, {self.destination}, {self.description}"
