import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectlistPageRoutingModule } from './selectlist-routing.module';

import { SelectlistPage } from './selectlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectlistPageRoutingModule
  ],
  declarations: [SelectlistPage]
})
export class SelectlistPageModule {}
