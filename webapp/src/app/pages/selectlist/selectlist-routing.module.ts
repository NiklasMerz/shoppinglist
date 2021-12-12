import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectlistPage } from './selectlist.page';

const routes: Routes = [
  {
    path: '',
    component: SelectlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectlistPageRoutingModule {}
