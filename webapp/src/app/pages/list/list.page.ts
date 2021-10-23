import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/backend';

import { Item } from '../../backend';
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
  id: string;
  searchItem: Item;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
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
      this.searchItem = {text: searchterm, list: this.id};

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
    this.api.updateItem(item.id.toString(), 'false', this.id, item).toPromise().then(async () => {
      await this.getItems(true);
      this.clear();
    }).catch(err => console.log(err));
  }


  private getItems(buy: boolean) {
    return this.api.listItems(buy ? 'true': 'false', this.id).toPromise();
  }
}
