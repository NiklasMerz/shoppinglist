import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService, Receipt, Trip } from 'src/app/backend';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  id: any;
  trip: Trip;
  receipt: Receipt;
  ocrJson: string;

  constructor(private api: ApiService, private activatedRouter: ActivatedRoute, private toastCtrl: ToastController,
    private http: HttpClient, private loadintCtrl: LoadingController) { }

  ngOnInit() {
    this.init();

    this.setupTestData();
  }

  save() {
    if (this.id) {
      this.api.updateTrip(this.trip.id.toString(), this.trip).subscribe(() => {
        this.toastCtrl.create({
          message: 'Trip updated',
          duration: 2000
        }).then(toast => toast.present());
      });
    } else {
      this.api.createTrip(this.trip).subscribe(() => {
        this.toastCtrl.create({
          message: 'Trip created',
          duration: 2000
        }).then(toast => toast.present());
      });
    }
  }

  async addReceiptData() {
    const url = environment.API_BASE_PATH + environment.API_PREFIX + '/file-receipt/json';
    let headers = new HttpHeaders();
    headers= headers.append('content-type', 'application/json');
    this.receipt = await this.http.post(url, this.ocrJson, {headers}).toPromise();
  }

  async addReceiptImage(event) {
    const loading = await this.loadintCtrl.create({
      message: 'Uploading...'
    });
    loading.present();

    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const url = environment.API_BASE_PATH + environment.API_PREFIX + '/file-receipt/image';
    try {
      this.receipt = await this.http.post(url, formData).toPromise();
      console.debug('res', this.receipt);
      loading.dismiss();
    } catch (err) {
      alert('Error uploading file');
      console.error('err', err);
      loading.dismiss();
    }
  }

  private async init() {
    this.id = this.activatedRouter.snapshot.params.trip;
    if (this.id) {
      this.trip = await this.api.retrieveTrip(this.id).toPromise();
      const receipts = await this.api.listReceipts(this.id).toPromise();
      if (receipts?.length > 0) {
        this.receipt = receipts[0];
      }
    } else {

      this.trip = {};
    }
  }

  private setupTestData() {
    const testdata = `
    {
      "abn_number": "",
      "account_number": "",
      "bill_to_address": "",
      "bill_to_name": "",
      "bill_to_vat_number": "",
      "card_number": "",
      "cashback": 0,
      "category": "",
      "created": "2021-11-14 10:56:24",
      "currency_code": "EUR",
      "date": "",
      "delivery_date": "",
      "discount": 0,
      "document_reference_number": "0011611271021103007369",
      "document_title": "",
      "document_type": "receipt",
      "due_date": "",
      "duplicate_of": "",
      "external_id": "",
      "id": 46752763,
      "img_file_name": "46752763.jpg",
      "img_thumbnail_url": "https://cdn.veryfi.com/receipts/07d58cc4-903b-4cfc-9acb-7ccbd512e104/thumbnail.jpg",
      "img_url": "https://cdn.veryfi.com/receipts/07d58cc4-903b-4cfc-9acb-7ccbd512e104/ad575c02-c4b4-4e65-a041-7e96406ba0e6.jpg",
      "insurance": 0,
      "invoice_number": "1PX",
      "is_duplicate": 0,
      "line_items": [
        {
          "date": "",
          "description": "Rapps Saft 6x11",
          "discount": 0,
          "id": 112482536,
          "order": 0,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 10.11,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Mozzarella",
          "discount": 0,
          "id": 112482537,
          "order": 1,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.43,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "PP Mortadella",
          "discount": 0,
          "id": 112482538,
          "order": 2,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.09,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "PP Salami",
          "discount": 0,
          "id": 112482539,
          "order": 3,
          "price": 0.69,
          "quantity": 2,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.69,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Blattertelo",
          "discount": 0,
          "id": 112482540,
          "order": 4,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Meggle Ru.Baguette",
          "discount": 0,
          "id": 112482541,
          "order": 5,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.19,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Milr.Käse d.Jahr.",
          "discount": 0,
          "id": 112482542,
          "order": 6,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.99,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Cheddar rot",
          "discount": 0,
          "id": 112482543,
          "order": 7,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.61,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Gouda",
          "discount": 0,
          "id": 112482544,
          "order": 8,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.79,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "HENGLEIN Pizzateig",
          "discount": 0,
          "id": 112482545,
          "order": 9,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.99,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Wrap Chicken",
          "discount": 0,
          "id": 112482546,
          "order": 10,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.79,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Bondu.Country Mix",
          "discount": 0,
          "id": 112482547,
          "order": 11,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 2.49,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Rana Pf. Gnocchi",
          "discount": 0,
          "id": 112482548,
          "order": 12,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 2.49,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Bürg.Gem. Maultas",
          "discount": 0,
          "id": 112482549,
          "order": 13,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.49,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Bürger Maultasch",
          "discount": 0,
          "id": 112482550,
          "order": 14,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.59,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Tortelloni",
          "discount": 0,
          "id": 112482551,
          "order": 15,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.19,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "E. Tortelloni",
          "discount": 0,
          "id": 112482552,
          "order": 16,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.79,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Gurken Klein",
          "discount": 0,
          "id": 112482553,
          "order": 17,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.99,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "E.Gen.Tiramisu",
          "discount": 0,
          "id": 112482554,
          "order": 18,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 2.69,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Oetk.Gr Pudding",
          "discount": 0,
          "id": 112482555,
          "order": 19,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.99,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Exqu.Cremig-Feine",
          "discount": 0,
          "id": 112482556,
          "order": 20,
          "price": 1.19,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.79,
          "type": "food",
          "unit_of_measure": "2x"
        },
        {
          "date": "",
          "description": "E.Champig. 1.W.1.s.",
          "discount": 0,
          "id": 112482557,
          "order": 21,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 2.38,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Z.Do.Caesar Sauce",
          "discount": 0,
          "id": 112482558,
          "order": 22,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.99,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Smoothie",
          "discount": 0,
          "id": 112482559,
          "order": 23,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.89,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Dressing Amer.",
          "discount": 0,
          "id": 112482560,
          "order": 24,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.69,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Hengs. Burg.Gurken",
          "discount": 0,
          "id": 112482561,
          "order": 25,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.59,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Barilla Pastasauce",
          "discount": 0,
          "id": 112482562,
          "order": 26,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 3.19,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Smoothie",
          "discount": 0,
          "id": 112482563,
          "order": 27,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.89,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "GT Americ. Sandwich",
          "discount": 0,
          "id": 112482564,
          "order": 28,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.79,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Smoothie",
          "discount": 0,
          "id": 112482565,
          "order": 29,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.89,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "E.Manda.Orange.",
          "discount": 0,
          "id": 112482566,
          "order": 30,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.19,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Tomaten pass",
          "discount": 0,
          "id": 112482567,
          "order": 31,
          "price": 1.69,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.45,
          "type": "food",
          "unit_of_measure": "2x"
        },
        {
          "date": "",
          "description": "Chocomel H-Kakao",
          "discount": 0,
          "id": 112482568,
          "order": 32,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 3.38,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "G&G Backpapier",
          "discount": 0,
          "id": 112482569,
          "order": 33,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.95,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "OBST/GEMÜSE",
          "discount": 0,
          "id": 112482570,
          "order": 34,
          "price": 0.89,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.11,
          "type": "food",
          "unit_of_measure": "2x"
        },
        {
          "date": "",
          "description": "G&G Frischei-Waff.",
          "discount": 0,
          "id": 112482571,
          "order": 35,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.78,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Tempo Taschentü.",
          "discount": 0,
          "id": 112482572,
          "order": 36,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 2.65,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "E.Mehrkornkracher",
          "discount": 0,
          "id": 112482573,
          "order": 37,
          "price": 0,
          "quantity": 1,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 0.99,
          "type": "food",
          "unit_of_measure": ""
        },
        {
          "date": "",
          "description": "Birnen Nashi",
          "discount": 0,
          "id": 112482574,
          "order": 38,
          "price": 4.99,
          "quantity": 0.27,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 1.35,
          "type": "food",
          "unit_of_measure": "kg"
        },
        {
          "date": "",
          "description": "Apfel",
          "discount": 0,
          "id": 112482575,
          "order": 39,
          "price": 3.99,
          "quantity": 0.658,
          "reference": "",
          "section": "",
          "sku": "",
          "tax": 0,
          "tax_rate": 0,
          "total": 2.63,
          "type": "food",
          "unit_of_measure": "kg"
        }
      ],
      "notes": "",
      "order_date": "",
      "payment_display_name": "Visa",
      "payment_terms": "",
      "payment_type": "visa",
      "phone_number": "(066)1) 25027981",
      "purchase_order_number": "",
      "rounding": 0,
      "service_end_date": "",
      "service_start_date": "",
      "ship_date": "",
      "ship_to_address": "",
      "ship_to_name": "",
      "shipping": 0,
      "store_number": "",
      "subtotal": 68.89,
      "tax": 6.48,
      "tax_lines": [
        {
          "base": 0,
          "name": "",
          "order": 0,
          "rate": 7,
          "total": 3.86
        },
        {
          "base": 0,
          "name": "",
          "order": 1,
          "rate": 19,
          "total": 2.62
        }
      ],
      "tip": 0,
      "total": 75.37,
      "total_weight": "",
      "tracking_number": "",
      "updated": "2021-11-14 11:37:21",
      "vat_number": "",
      "vendor": {
        "address": "Paul-Klee-Straße, 36041 Fulda, Germany",
        "category": "Grocery",
        "email": "",
        "fax_number": "",
        "name": "Edeka Patrick Melzer",
        "phone_number": "(066)1) 25027981",
        "raw_name": "EDEKA Patrick Melzer",
        "vendor_logo": "https://cdn.veryfi.com/logos/tmp/887385200.png",
        "vendor_reg_number": "",
        "vendor_type": "Grocery",
        "web": ""
      },
      "vendor_account_number": "",
      "vendor_bank_name": "",
      "vendor_bank_number": "",
      "vendor_bank_swift": "",
      "vendor_iban": ""
    }
    `;

    this.ocrJson = testdata;
  }
}
