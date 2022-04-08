from django.db import models
from django import googlemaps

API_KEY = 'AIzaSyABtJ2a7ItBSs6UP65ejX43b7mZcD1cSKs'
map_client = googlemaps.Client(API_KEY)

class Trip_Plan(models.Model):
    location = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.location}, {self.destination}, {self.description}"
