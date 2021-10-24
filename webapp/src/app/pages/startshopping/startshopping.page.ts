import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService, Store, Trip } from 'src/app/backend';

@Component({
  selector: 'app-startshopping',
  templateUrl: './startshopping.page.html',
  styleUrls: ['./startshopping.page.scss'],
})
export class StartShoppingPage implements OnInit {
  @Input() listId: number;
  public locationName: string;
  public stores: Store[] = [];

  constructor(private api: ApiService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadStores();
  }

  selectStore(store: Store) {
    this.create(store);
  }

  async create(store: Store) {
    let trip: Trip = { store: store.id, list: this.listId };
    trip = await this.api.createTrip(trip).toPromise();

    this.modalCtrl.dismiss({
      trip
    });
  }

  private loadStores() {
    this.api.listStores().subscribe(stores => {
      this.stores = stores;
    });
  }

}
