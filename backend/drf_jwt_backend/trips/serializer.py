from rest_framework import serializers

from .models import Trip

class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = ('id', 'pickup', 'dropoff', 'description', 'accepted', 'completed', 'client_id', 'driver_id', 'pickuplat', 'pickuplng', 'dropofflat', 'dropofflng')
        depth=1
    client_id = serializers.IntegerField(write_only=True)
    driver_id = serializers.IntegerField(write_only=True)
   
   

    def create(self, validated_data):
            trip = Trip.objects.create(
                pickup =validated_data['pickup'],
                dropoff=validated_data['dropoff'],
                description=validated_data['description'],
                client_id=validated_data['client_id'],
                # driver_id=validated_data['driver_id'],
                pickuplng=validated_data['pickuplng'],
                pickuplat=validated_data['pickuplat'],
                dropofflng=validated_data['dropofflng'],
                dropofflat=validated_data['dropofflat'],
                accepted=validated_data['accepted'],
                completed=validated_data['completed'],
                # If added new columns through the User model, add them in this
                # create method call in the format as seen above
            )
            trip.save(Trip)
            return trip