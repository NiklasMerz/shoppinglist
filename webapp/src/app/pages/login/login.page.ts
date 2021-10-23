import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  login() {
    this.modalCtrl.dismiss({
      username: this.username,
      password: this.password
    });
  }

}
