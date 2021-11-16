import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/backend';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: Item;
  @Output() delete = new EventEmitter<Item>();

  constructor() { }

  ngOnInit() {}

  del() {
    this.delete.emit(this.item);
  }

}
