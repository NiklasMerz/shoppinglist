import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/:token',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list/:id',
    loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'startshopping',
    loadChildren: () => import('./pages/startshopping/startshopping.module').then( m => m.StartshoppingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trip/:trip',
    loadChildren: () => import('./pages/trip/trip.module').then( m => m.TripPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trip',
    loadChildren: () => import('./pages/trip/trip.module').then( m => m.TripPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trips',
    loadChildren: () => import('./pages/trips/trips.module').then( m => m.TripsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'item-detail',
    loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
