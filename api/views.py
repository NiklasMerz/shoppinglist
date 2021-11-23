from list.models import *
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope

from list.receipts import file_reciept, file_reciept_from_image

class ListViewSet(viewsets.ModelViewSet):
    """
    List endpoint
    """
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticated]

class ItemFilter(filters.FilterSet):
    description = filters.CharFilter(field_name="description", lookup_expr='contains')
    class Meta:
        model = Item
        fields = ['buy', 'list', 'description']


class ItemViewSet(viewsets.ModelViewSet):
    """
    Item endpoint
    """
    queryset = Item.objects.all().order_by('index')
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_class = ItemFilter
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

class ReceiptViewSet(viewsets.ModelViewSet):
    """
    Receipt endpoint
    """
    queryset = Receipt.objects.all().order_by('-time')
    serializer_class = ReceiptSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['trip']

# Receipt creation from images or parsed data from external services
# Custom API not part of OpenAPI spec
class ReceiptDataView(APIView):
    """
    Creates receipt and related objects from json
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        json_data = request.data
        trip_id = request.query_params.get('tripId', None)

        reciept = file_reciept(json_data, trip_id)
        
        return Response(ReceiptSerializer(reciept).data, status=status.HTTP_201_CREATED)

class ReceiptImageView(APIView):
    """
    Creates receipt and related objects from image
    """
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        trip_id = request.query_params.get('tripId', None)

        data = request.data['file']
        reciept = file_reciept_from_image(data, trip_id)
        return Response(ReceiptSerializer(reciept).data, status=status.HTTP_201_CREATED)
        