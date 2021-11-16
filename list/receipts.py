import os
from django.utils import timezone
from veryfi import Client
from .models import BrandItem, Receipt, Trip, Store

def file_reciept(json_data, trip_id):
    """
    This function takes a json object from the external provider, creates the objects and returns the receipt.
    """
    receipt = Receipt.objects.create()
    return create_receipt_verify(receipt, json_data, trip_id)

def file_reciept_from_image(image, trip_id):
    """
    This function takes an image and runs OCR with an external provider then creates the objects and returns the receipt.
    """
    receipt = Receipt.objects.create()
    receipt.image.save(image.name, image)
    return create_receipt_from_image_verify(receipt, receipt.image, trip_id)

def create_receipt_verify(receipt, json_data, trip_id):
    
    time = timezone.now()
    if json_data['date'] and json_data['date'] != '':
        time = json_data['date']

    if trip_id:
        trip = Trip.objects.get(id=trip_id, time=time)
    else:
        store = Store.objects.get_or_create(name=json_data['vendor']['name'])
        trip = Trip.objects.create(store=store[0])

    receipt.time = time
    receipt.ocr_data = json_data
    receipt.trip = trip
    receipt.total = json_data['total']

    for line_item in json_data['line_items']:
        item = BrandItem.objects.get_or_create(description=line_item['description'])
        receipt.line_items.create(description=line_item['description'], total=line_item['total'], quantity=line_item['quantity'], brand_item=item[0])

    receipt.save()
    return receipt

def create_receipt_from_image_verify(receipt, image, trip_id):

    client_id = os.environ.get('VERYFI_CLIEND_ID')
    client_secret = os.environ.get('VERYFI_CLIEND_SECRET')
    username = os.environ.get('VERYFI_USERNAME')
    api_key = os.environ.get('VERYFI_API_KEY')

    categories = ['Grocery']

    # This submits document for processing (takes 3-5 seconds to get response)
    veryfi_client = Client(client_id, client_secret, username, api_key)
    json_data = veryfi_client.process_document(image.path, categories=categories)

    return create_receipt_verify(receipt, json_data, trip_id)