from list.models import *
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'description', 'note', 'buy', 'list']

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
        fields = ['id', 'time', 'store', 'list', 'count', 'finish_time', 'label', 'notes']

class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = ['id', 'time', 'trip', 'item', 'count']

class LineItemSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(read_only=True)
    date = serializers.CharField(source='receipt.time')
    class Meta:
        model = LineItem
        fields = ('id', 'description', 'total', 'quantity', 'item', 'date')

class ReceiptSerializer(serializers.ModelSerializer):
    line_items = LineItemSerializer(many=True, read_only=True)
    class Meta:
        model = Receipt
        fields = ['id', 'time', 'trip', 'total', 'line_items']