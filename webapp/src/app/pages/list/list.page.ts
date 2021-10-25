import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService, Checkout, Trip } from 'src/app/backend';

import { Item } from '../../backend';
import { StartShoppingPage } from '../startshopping/startshopping.page';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  allItems: Item[] = [];
  listItems: Item[] = [];
  notListItems: Item[] = [];
  name: string;
  mode: 'add' | 'buy' = 'add';
  searchActive = false;
  listId: string;
  searchItem: Item;
  trip: Trip;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private modalCtrl: ModalController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.listId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getItems(true).then((data) => {
      this.allItems = data;
      this.listItems = data;
    });
  }

  async search(event) {
    const searchterm = event.detail.value.toLowerCase();

    if (searchterm !== '') {
      this.listItems = this.allItems.filter(item => item.text.includes(searchterm));

      this.searchActive = true;
      this.searchItem = {text: searchterm, list: this.listId};

      this.notListItems = await (await this.getItems(false)).filter(item => item.text.includes(searchterm));
    }
  }

  clear() {
    this.searchActive = false;
    this.listItems = this.allItems;
  }

  create(item: Item) {
    this.api.createItem(item).subscribe(data => {
      this.allItems.push(data);
      this.clear();
    });
  }

  add(item: Item) {
    item.buy = true;
    this.api.updateItem(item.id.toString(), 'false', this.listId, item).toPromise().then(async () => {
      await this.getItems(true);
      this.clear();
    }).catch(err => console.log(err));
  }

  // TODO Animation

  async startShopping() {
    this.mode = 'buy';

    const modal = await this.modalCtrl.create({
      component: StartShoppingPage,
      componentProps: {
        listId: this.listId
      },
      backdropDismiss: false
    });
    await modal.present();

    modal.onDidDismiss().then(async (res) => {
      this.trip = res.data.trip;

      const toast = await this.toastCtrl.create({
        message: 'Shopping started',
        duration: 2000
      });
      await toast.present();
    });
  }

  async stopShopping() {
    this.mode = 'add';
    this.trip = null;

    const toast = await this.toastCtrl.create({
      message: 'Shopping ended',
      duration: 2000
    });
    await toast.present();
  }

  async check(item: Item) {
    // TODO error handling
    item.buy = false;
    await this.api.updateItem(item.id.toString(), 'true', this.listId, item).toPromise();
    const checkout: Checkout = {trip: this.trip.id, item: item.id};
    await this.api.createCheckout(checkout).toPromise();

    // TODO fix array display remove and add
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.listItems.splice(this.listItems.indexOf(item), 1);
  }

  private getItems(buy: boolean) {
    return this.api.listItems(buy ? 'true': 'false', this.listId).toPromise();
  }
}
