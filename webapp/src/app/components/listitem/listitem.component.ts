import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/backend';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {}

}
