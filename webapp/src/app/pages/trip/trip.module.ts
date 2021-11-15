import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripPageRoutingModule } from './trip-routing.module';

import { TripPage } from './trip.page';
import { ReceiptComponent } from 'src/app/components/receipt/receipt.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripPageRoutingModule
  ],
  declarations: [ReceiptComponent, TripPage]
})
export class TripPageModule {}
