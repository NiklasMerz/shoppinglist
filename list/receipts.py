import os
from veryfi import Client
from .models import Item, Receipt, Trip, Store

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
    
    if trip_id:
        trip = Trip.objects.get(id=trip_id)
    else:
        store = Store.objects.get_or_create(name=json_data['vendor']['name'])
        trip = Trip.objects.create(store=store[0])

    receipt.trip = trip
    receipt.total = json_data['total']

    for line_item in json_data['line_items']:
        item = Item.objects.get_or_create(description=line_item['description'])
        receipt.line_items.create(description=line_item['description'], total=line_item['total'], quantity=line_item['quantity'], item=item[0])

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