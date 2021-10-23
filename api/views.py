from list.models import *
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *


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
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class StoreViewSet(viewsets.ModelViewSet):
    """
    Store endpoint
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [permissions.IsAuthenticated]

class TripViewSet(viewsets.ModelViewSet):
    """
    Trip endpoint
    """
    queryset = Trip.objects.all().order_by('-time')
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated]

class CheckoutViewSet(viewsets.ModelViewSet):
    """
    Checkout endpoint
    """
    queryset = Checkout.objects.all().order_by('-time')
    serializer_class = CheckoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        trip = Trip.objects.filter(id=self.request.data['trip']).first()
        count = trip.count + 1
        trip.count = count
        trip.save()
        serializer.save(count=count)