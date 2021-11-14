import pytest
import json
from django.test import TestCase

from list.receipts import file_reciept
from .models import Receipt

class ReceiptTestCase(TestCase):
    def setUp(self):
        pass

    @pytest.mark.django_db
    def test_create_receipt_from_veryfi(self):
        with open('list/test_data/veryfi-json.json') as json_file:
            data = json.load(json_file)
            r = file_reciept(data, None)

            assert  r.line_items.count() == 40
            