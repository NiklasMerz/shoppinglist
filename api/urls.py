from django.urls import include, path
from rest_framework import routers
from api import views
from rest_framework.schemas import get_schema_view

router = routers.DefaultRouter()
router.register(r'lists', views.ListViewSet)
router.register(r'items', views.ItemViewSet)
router.register(r'stores', views.StoreViewSet)
router.register(r'trips', views.TripViewSet)
router.register(r'checkouts', views.CheckoutViewSet)
router.register(r'receipts', views.ReceiptViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('openapi', get_schema_view(
        title='Shopping Advanced',
        description='API for mobile apps',
        version="'0.0.1'"
    ), name='openapi-schema'),

    # Non-openapi endpoints
    path('file-receipt/json', views.ReceiptDataView.as_view(), name='file-receipt/json'),
]