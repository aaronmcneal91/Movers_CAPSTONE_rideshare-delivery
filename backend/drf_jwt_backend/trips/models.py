from django.db import models
from clients.models import Client

class Trip(models.Model):
    pickup = models.CharField(max_length=255)
    dropoff =models.CharField(max_length=255)
    description = models.CharField(max_length=255,blank=True, null=True)
    accepted = models.BooleanField(default=False,blank=True, null=True)
    completed = models.BooleanField(default=False,blank=True, null=True)
    pickuplat = models.DecimalField(max_digits=30, decimal_places=15,blank=True, null=True)
    pickuplng = models.DecimalField(max_digits=30, decimal_places=15,blank=True, null =True)
    dropofflat = models.DecimalField(max_digits=30, decimal_places=15,blank=True, null=True)
    dropofflng = models.DecimalField(max_digits=30, decimal_places=15,blank=True, null =True)
    client = models.ForeignKey(Client, related_name='client_id', db_column='client_id', on_delete=models.CASCADE,blank=True, null=True)
    driver = models.ForeignKey(Client, related_name='driver_id', db_column='driver_id', on_delete=models.CASCADE,blank=True, null=True)

    def __str__(incomplete_trip):
        return f"{incomplete_trip.pickup}, {incomplete_trip.dropoff}, {incomplete_trip.description}"
