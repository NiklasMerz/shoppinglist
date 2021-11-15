import { Component, Input, OnInit } from '@angular/core';
import { Receipt } from 'src/app/backend';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {

  @Input() receipt: Receipt;

  constructor() { }

  ngOnInit() {}

}
