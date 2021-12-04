import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public token?: string;

  public username: string;
  public password: string;

  constructor(private router: Router, private authService: AuthService, private oauthService: OAuthService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.oauthService.configure(this.authService.getConfig());
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(
        _ => {
          if (this.authService.isLoggedIn()) {
            this.token = 'Logged In!';
          } else {
            this.token = 'Not Logged In!';
          }
        }
    );
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    try {
      await loading.present();
      await this.authService.login(this.username, this.password);
      loading.dismiss();

      // TODO modal or better?
      await this.router.navigate(['/']);
      location.reload();
    } catch (e) {
      loading.dismiss();
      this.alertCtrl.create({
        message: 'Login failed',
        buttons: ['OK']
      }).then(toast => toast.present());
    }
  }

  logout() {
    this.authService.logout();
  }
}
