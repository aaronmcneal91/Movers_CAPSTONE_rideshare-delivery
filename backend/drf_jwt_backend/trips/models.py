from django.db import models
from clients.models import Client

class Trip(models.Model):
    pickup = models.CharField(max_length=255)
    dropoff =models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    accepted = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    pickuplat = models.DecimalField(max_digits=30, decimal_places=15, null=True)
    pickuplng = models.DecimalField(max_digits=30, decimal_places=15, null =True)
    dropofflat = models.DecimalField(max_digits=30, decimal_places=15, null=True)
    dropofflng = models.DecimalField(max_digits=30, decimal_places=15, null =True)
    client = models.ForeignKey(Client, related_name='client_id', db_column='client_id', on_delete=models.CASCADE)
    driver = models.ForeignKey(Client, related_name='driver_id', db_column='driver_id', on_delete=models.CASCADE, null=True)

    def __str__(completed_trip):
        return f"{completed_trip.pickup}, {completed_trip.dropoff}, {completed_trip.description}"
