from django.db import models
from django_google_maps import fields as map_fields
from serializer import TripSerializer




class Trip_Plan(models.Model):
    location = map_fields.GeoLocationField(max_lenght=250)
    destination = map_fields.AddressField(max_lenght=250)
    description = models.CharField(max_length=250)
   


    def __str__(self):
        return f"{self.location}, {self.destination}, {self.description}"
