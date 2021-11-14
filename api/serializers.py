from list.models import *
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'text', 'note', 'buy', 'list']

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'name']

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'note', 'location']

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'time', 'store', 'list', 'count', 'finish_time', 'label', 'notes', 'total']

class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = ['id', 'time', 'trip', 'item', 'count']