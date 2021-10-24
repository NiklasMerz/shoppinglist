import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartShoppingPage } from './startshopping.page';

const routes: Routes = [
  {
    path: '',
    component: StartShoppingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartshoppingPageRoutingModule {}
