import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService, LineItem } from 'src/app/backend';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  @Input() itemId: string;
  lineItems: LineItem[] = [];


  constructor(private modalCtrl: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.load();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  private async load() {
    this.lineItems = await this.api.listLineItems(this.itemId).toPromise();
  }

}
