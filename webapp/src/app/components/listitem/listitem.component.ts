import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/backend';
import { ItemDetailPage } from 'src/app/pages/item-detail/item-detail.page';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: Item;
  @Output() delete = new EventEmitter<Item>();
  @Output() itemClick = new EventEmitter<Item>();

  constructor() { }

  ngOnInit() {}

  del() {
    this.delete.emit(this.item);
  }

  clck() {
    this.itemClick.emit(this.item);
  }

}
