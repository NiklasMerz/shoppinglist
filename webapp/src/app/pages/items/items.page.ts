import { Component } from '@angular/core';
import { ApiService, CatalogItem } from 'src/app/backend';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage {
  items: CatalogItem[] = [];

  constructor(private api: ApiService) { }

  ionViewDidEnter() {
    this.api.listCatalogItems().subscribe((data) => this.items = data);
  }
}
