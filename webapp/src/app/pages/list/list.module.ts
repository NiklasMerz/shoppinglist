import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdTimerModule } from 'angular-cd-timer';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';

import { ListItemComponent } from '../../components/listitem/listitem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    CdTimerModule
  ],
  declarations: [ListItemComponent, ListPage]
})
export class ListPageModule {}
