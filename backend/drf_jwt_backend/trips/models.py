from django.db import models
from clients.models import Client

class Trip(models.Model):
    pickup = models.CharField(max_length=255)
    dropoff =models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    def __str__(completed_trip):
        return f"{completed_trip.pickup}, {completed_trip.dropoff}, {completed_trip.description},{completed_trip.client.id}"
