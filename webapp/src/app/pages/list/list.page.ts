import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/backend';

import { ListItems } from '../../backend';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  items: ListItems[] = [];
  name: string;
  mode: 'add' | 'buy' = 'add';

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.api.retrieveList(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
      this.items = data.items;
      this.name = data.name;
    });
  }

}
