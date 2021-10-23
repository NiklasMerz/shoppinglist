import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { BASE_PATH, Configuration, ConfigurationParameters, ApiModule } from './backend';

export function apiConfigFactory (): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  HttpClientModule, OAuthModule.forRoot(), ApiModule.forRoot(apiConfigFactory)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: BASE_PATH, useValue: environment.API_BASE_PATH}],
  bootstrap: [AppComponent],
})
export class AppModule {}
