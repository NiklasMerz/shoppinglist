from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(List)
admin.site.register(Item)
admin.site.register(Store)
admin.site.register(Checkout)
admin.site.register(LineItem)

class SKUInline(admin.StackedInline):
    model = SKU
    extra = 0

class CatalogItemAdmin(admin.ModelAdmin):
    inlines = [SKUInline]
    search_fields = ["description"]

admin.site.register(CatalogItem, CatalogItemAdmin)

class CheckoutInline(admin.StackedInline):
    model = Checkout
    extra = 1

class TripAdmin(admin.ModelAdmin):
    inlines = [CheckoutInline]

admin.site.register(Trip, TripAdmin)
class LineItemInline(admin.StackedInline):
    model = LineItem
    extra = 1
class ReceiptAdmin(admin.ModelAdmin):
    inlines = [LineItemInline]

admin.site.register(Receipt, ReceiptAdmin)

class SKUAdmin(admin.ModelAdmin):
    inlines = [LineItemInline]
    search_fields = ["description"]
    list_filter = ["catalog_item"]

admin.site.register(SKU, SKUAdmin)
