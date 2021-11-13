from list.models import *
from rest_framework import viewsets, permissions
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import JSONParser

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope

class ListViewSet(viewsets.ModelViewSet):
    """
    List endpoint
    """
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticated]


class ItemViewSet(viewsets.ModelViewSet):
    """
    Item endpoint
    """
    queryset = Item.objects.all().order_by('index')
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['buy', 'list']
class StoreViewSet(viewsets.ModelViewSet):
    """
    Store endpoint
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [permissions.IsAuthenticated]

class OnlyFormTextParser(JSONParser):
    media_type = "application/x-www-form-urlencoded"

class TripViewSet(viewsets.ModelViewSet):
    """
    Trip endpoint
    """
    queryset = Trip.objects.all().order_by('-time')
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [OnlyFormTextParser]

class CheckoutViewSet(viewsets.ModelViewSet):
    """
    Checkout endpoint
    """
    queryset = Checkout.objects.all().order_by('-time')
    serializer_class = CheckoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Get current count from trip, set to checkout and increase count
        trip = Trip.objects.filter(id=self.request.data['trip']).first()
        count = trip.count
        trip.count = count + 1
        trip.save()

        # Update index in item. The last counter value for now
        item = Item.objects.filter(id=self.request.data['item']).first()
        item.index = count
        item.save()

        serializer.save(count=count)