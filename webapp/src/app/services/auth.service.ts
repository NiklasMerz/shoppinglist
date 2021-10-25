import { Injectable } from '@angular/core';

import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {Platform} from '@ionic/angular';

import { Configuration } from '../backend';

import { environment } from '../../environments/environment';

// export const authCodeFlowConfig: AuthConfig = {
//   // Url of the Identity Provider
//   issuer: 'http://auth.demo.pragmaticindustries.de/auth/realms/packi',
//
//   requireHttps: false,
//
//   // loginUrl: 'https://auth.demo.pragmaticindustries.de/auth/realms/packi/protocol/openid-connect/auth',
//
//   // URL of the SPA to redirect the user to after login
//   redirectUri: window.location.origin + '/login',
//
//   // The SPA's id. The SPA is registerd with this id at the auth-server
//   // clientId: 'server.code',
//   clientId: 'packi_app',
//
//   // Just needed if your auth server demands a secret. In general, this
//   // is a sign that the auth server is not configured with SPAs in mind
//   // and it might not enforce further best practices vital for security
//   // such applications.
//   // dummyClientSecret: 'secret',
//
//   responseType: 'code',
//
//   // set the scope for the permissions the client should request
//   // The first four are defined by OIDC.
//   // Important: Request offline_access to get a refresh token
//   // The api scope is a usecase specific one
//   scope: 'openid email',
//
//   oidc: true,
//
//   showDebugInformation: true,
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService, private platform: Platform, private apiConfiguration: Configuration) { }

  getConfig(): AuthConfig {
    return {
      // Url of the Identity Provider
      // issuer: 'http://auth.demo.pragmaticindustries.de/auth/realms/packi',

      requireHttps: false,

      tokenEndpoint: environment.API_BASE_PATH + '/o/token/',

      // URL of the SPA to redirect the user to after login
      redirectUri: this.getRedirectUri(),

      // The SPA's id. The SPA is registerd with this id at the auth-server
      // clientId: 'server.code',
      clientId: environment.CLIENT_ID,

      // Just needed if your auth server demands a secret. In general, this
      // is a sign that the auth server is not configured with SPAs in mind
      // and it might not enforce further best practices vital for security
      // such applications.
      // dummyClientSecret: 'secret',

      responseType: 'code',

      // set the scope for the permissions the client should request
      // The first four are defined by OIDC.
      // Important: Request offline_access to get a refresh token
      // The api scope is a usecase specific one
      scope: 'read write',

      oidc: false,

      showDebugInformation: true,

      openUri: uri => window.open(uri)
    };
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  login(username: string, password: string) {
    console.log('Configure');
    this.oauthService.configure(this.getConfig());
    console.log('Try Login');
    this.oauthService.initLoginFlow();
    return this.oauthService.fetchTokenUsingPasswordFlow(username, password).then((token) => token.access_token);
  }

  logout() {
    this.oauthService.logOut();
  }

  private getRedirectUri(): string {
    console.log('Get RedirectURI. Is Hybrid: ' + this.platform.is('hybrid'))
    if (this.platform.is('hybrid')) {
      // Universal Link
      return 'TODO';
    } else {
      return window.location.origin + '/login';
    }
  }
}
