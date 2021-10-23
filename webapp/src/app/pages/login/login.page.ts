import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public token?: string;

  public username: string;
  public password: string;

  constructor(private router: Router, private authService: AuthService, private oauthService: OAuthService) { }

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
    await this.authService.login(this.username, this.password);

    // TODO modal or better?
    await this.router.navigate(['/']);
    location.reload();
  }

  logout() {
    this.authService.logout();
  }
}
