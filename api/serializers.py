from list.models import *
from rest_framework import serializers


class CatalogItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogItem
        fields = ['id', 'description']

class ItemSerializer(serializers.ModelSerializer):
    last_checkout = serializers.SerializerMethodField()
    last_line_item_date = serializers.SerializerMethodField()
    last_line_item_total = serializers.SerializerMethodField()

    def get_last_checkout(self, obj):
        try:
            return obj.checkouts.latest().time
        except:
            return None

    def get_last_line_item_date(self, obj):
        try:
            return LineItem.objects.filter(sku__in=obj.skus.all()).latest().receipt.time
        except:
            return None

    def get_last_line_item_total(self, obj):
        try:
            return LineItem.objects.filter(sku__in=obj.skus.all()).latest().total.amount
        except:
            return None

    class Meta:
        model = Item
        fields = ['id', 'description', 'note', 'buy', 'list', 'last_checkout', 'last_line_item_date', 'last_line_item_total', 'catalog_item']

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
        fields = ['id', 'time', 'store', 'list', 'finish_time', 'label', 'notes']

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