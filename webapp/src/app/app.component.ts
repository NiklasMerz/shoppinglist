import { Component } from '@angular/core';
import { ApiService } from './backend/api/api.service';

import { List } from './backend/';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  lists: List[] = null;
  public appPages = [
    // { title: 'Lists', url: '/lists', icon: 'mail' },
  ];
  constructor(private api: ApiService) {
    this.api.listLists().subscribe(data => {
      this.lists = data;
    });
  }
}
