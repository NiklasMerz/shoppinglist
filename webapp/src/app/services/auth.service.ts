import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { environment } from '../../environments/environment';

import { LoginPage } from '../pages/login/login.page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private modalCtrl: ModalController) { }

  async getToken(): Promise<string> {
    console.debug('Getting token');
    const token= localStorage.getItem('token');
    return token ? token : await this.login('admin', 'admin'); 
  }

  private async login(username: string, password: string): Promise<string> {
    const res = await fetch(environment.API_BASE_PATH + '/o/token/', {
      method: 'POST',
      body: `grant_type=password&username${username}&password=${password}`
    });

    const json = await res.json();
    localStorage.setItem('token', json.access_token);
    localStorage.setItem('refresh_token', json.refresh_token);
    localStorage.setItem('expires_in', json.expires_in);
    localStorage.setItem('token_type', json.token_type);
    localStorage.setItem('scope', json.scope);
    return json.access_token;
  }

  async promptLogin(): Promise<string> {
    const modal = await this.modalCtrl.create({
      component: LoginPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.debug('Login data', data);
    return this.login(data.username, data.password);
  }
}
