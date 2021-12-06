from django.test import TestCase
from datetime import datetime

# Create your tests here.

import pytest
from django.test import TestCase
from list.models import Checkout, Store, Trip, Item, List

# Create your tests here.

class ListOrderTestCase(TestCase):
    def setUp(self):
        self.list = List.objects.create(name="Test List")
        self.item1 = Item.objects.create(description="Test Item 1", list=self.list, index=0)
        self.item2 = Item.objects.create(description="Test Item 2", list=self.list, index=2)
        self.item3 = Item.objects.create(description="Test Item 3", list=self.list, index=3)
        self.item4 = Item.objects.create(description="Test Item 4", list=self.list, index=1)

        self.store = Store.objects.create(name="Test Store")
        
    @pytest.mark.django_db
    def test_order_checkout(self):
        # Index is set by view while creating checkout for now

        list_items = self.list.items.all()
        self.assertEqual(list_items.count(), 4)
        self.assertEqual(list_items[0].description, "Test Item 1")
        self.assertEqual(list_items[1].description, "Test Item 4")
        self.assertEqual(list_items[2].description, "Test Item 2")
        self.assertEqual(list_items[3].description, "Test Item 3")
