import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/backend';
import { List } from 'src/app/backend/model/models';

@Component({
  selector: 'app-selectlist',
  templateUrl: './selectlist.page.html',
  styleUrls: ['./selectlist.page.scss'],
})
export class SelectlistPage implements OnInit {

  public locationName: string;
  public lists: List[] = [];

  constructor(private api: ApiService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadLists();
  }

  selectList(list: List) {
    this.modalCtrl.dismiss({
      list
    });
  }

  private loadLists() {
    this.api.listLists().subscribe(lists => {
      this.lists = lists;
    });
  }
}
