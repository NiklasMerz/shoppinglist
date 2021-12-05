import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { ApiService, CatalogItem, Checkout, Trip } from 'src/app/backend';

import { Item } from '../../backend';
import { ItemDetailPage } from '../item-detail/item-detail.page';
import { StartShoppingPage } from '../startshopping/startshopping.page';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  allItems: Item[] = [];
  listItems: Item[] = [];
  notListItems: Item[] = [];
  name: string;
  mode: 'add' | 'buy' = 'add';
  searchActive = false;
  listId: string;
  searchItem: Item;
  trip: Trip;
  catalogItems: CatalogItem[] = [];

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private modalCtrl: ModalController,
    private toastCtrl: ToastController, private router: Router) { }

  ionViewDidEnter() {
    const listId = this.activatedRoute.snapshot.paramMap.get('id');
    this.name = this.activatedRoute.snapshot.queryParamMap.get('list');

    if (listId !== null) {
      this.listId = listId;
      localStorage.setItem('listId', this.listId);
      localStorage.setItem('listName', this.name);
    } else {
      const lastListId = localStorage.getItem('listId');
      if (lastListId) {
        this.listId = lastListId;
        this.name = localStorage.getItem('listName');
      } else {
        this.router.navigate(['/trips']);
      }
    }

    this.showList();
  }

  async search(event) {
    const searchterm = event.detail.value;
    const lowercaseSearchTerm = (searchterm || '').toLowerCase();

    if (searchterm !== '') {
      this.searchActive = true;
      try {
        this.listItems = await this.getItems(true, lowercaseSearchTerm);
        this.searchItem = {description: searchterm, list: parseInt(this.listId, 10)};
        this.notListItems = await this.getItems(false, lowercaseSearchTerm);
        this.catalogItems = await this.api.listCatalogItems(lowercaseSearchTerm).toPromise();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async clear() {
    this.searchActive = false;
    this.listItems = this.allItems;
    this.searchbar.value = undefined;
  }

  create(item: Item) {
    this.api.createItem(item).subscribe(data => {
      this.allItems.push(data);
      this.clear();
    });
  }

  add(item: Item) {
    item.buy = true;
    this.api.partialUpdateItem(item.id.toString(), 'false', this.listId.toString(), undefined, item).toPromise().then(async () => {
      this.showList();
    }).catch(err => console.log(err));
  }

  async addFromCatalog(catalogItem: CatalogItem) {
    const newItem: Item = {
      description: catalogItem.description,
      list: parseInt(this.listId, 10),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      catalog_item: catalogItem.id, buy: true };
   await this.api.createItem(newItem).toPromise().then(async () => {
      this.showList();
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
        duration: 2000,
        position: 'top'
      });
      await toast.present();
    });
  }

  async stopShopping() {
    this.mode = 'add';
    this.trip.finish_time = new Date().toISOString();

    this.api.updateTrip(this.trip.id.toString(), this.trip).toPromise().then(async () => {
      this.trip = null;
      const toast = await this.toastCtrl.create({
        message: 'Shopping ended',
        duration: 2000
      });
      await toast.present();
    });
  }

  async check(item: Item) {
    // TODO error handling
    item.buy = false;
    await this.api.updateItem(item.id.toString(), 'true', this.listId.toString(), undefined, item).toPromise();
    const checkout: Checkout = {trip: this.trip.id, item: item.id};
    await this.api.createCheckout(checkout).toPromise();

    this.showList();
  }

  async removeFromList(item: Item) {
    item.buy = false;

    await this.api.partialUpdateItem(item.id.toString(), 'true', this.listId.toString(), undefined, item).toPromise();
    const toast = await this.toastCtrl.create({
      message: 'Item removed from list',
      duration: 2000
    });
    await toast.present();
    this.showList();
  }

  openDetail(catalogId: number) {
    this.modalCtrl.create({
      component: ItemDetailPage,
      componentProps: {
        itemId: catalogId,
      }
    }).then(modal => modal.present());
  }

  /**
   * Get current list from server and displays it resetting all filters
   */
  private showList() {
    this.getItems(true).then((data) => {
      this.allItems = data;
      this.clear();
    });
  }

  /**
   * Gets current list from server
   * @param buy filter by buy status
   * @returns items
   */
  private getItems(buy: boolean, search = undefined) {
    return this.api.listItems(buy ? 'true': 'false', this.listId, search).toPromise();
  }
}
