import pytest
import json
from django.test import TestCase
from moneyed import Money

from list.receipts import file_reciept, file_reciept_from_image

class ReceiptTestCase(TestCase):
    def setUp(self):
        pass

    @pytest.mark.django_db
    def test_create_receipt_from_veryfi(self):
        with open('list/test_data/veryfi-json.json') as json_file:
            data = json.load(json_file)
            r = file_reciept(data, None)

            assert  r.line_items.count() == 40
            assert  r.total.get_amount_in_sub_unit() == 7537

            assert  r.line_items.first().total.get_amount_in_sub_unit() == 1014


    @pytest.mark.django_db
    def test_create_receipt_from_image_with_veryfi(self):
        with open('list/test_data/test_receipt.jpg', 'rb') as image_file:
            r = file_reciept_from_image(image_file, None)

            assert  r.line_items.count() == 40
            assert  r.total.get_amount_in_sub_unit() == 7537

            assert  r.line_items.first().total.get_amount_in_sub_unit() == 1014
            