import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { ApiModule, Configuration, ConfigurationParameters } from './backend';

import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  HttpClientModule, ApiModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
    provide: Configuration,
    useFactory: (authService: AuthService) => new Configuration(
      {
        basePath: environment.API_BASE_PATH,
        accessToken: authService.getToken.bind(authService)
      }
    ),
    deps: [AuthService],
    multi: false
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
