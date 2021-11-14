
from .models import Item, Receipt, Trip, Store

def file_reciept(json_data, trip_id):
    """
    This function takes a json object from the external provider, creates the objects and returns the receipt.
    """
    return create_receipt_verify(json_data, trip_id)

def create_receipt_verify(json_data, trip_id):
    
    total = json_data['total']

    if trip_id:
        trip = Trip.objects.get(id=trip_id)
    else:
        store = Store.objects.get_or_create(name=json_data['vendor']['name'])
        trip = Trip.objects.create(store=store[0], total=total)

    receipt = Receipt.objects.create(trip=trip, total=total)

    for line_item in json_data['line_items']:
        item = Item.objects.get_or_create(description=line_item['description'])
        receipt.line_items.create(description=line_item['description'], total=line_item['total'], quantity=line_item['quantity'], item=item[0])

    return receipt