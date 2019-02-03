import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConfigService } from '../../services/config-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentUser: string = '';
  private isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.currentUser = this.authService.getUserEmail();
    this.isLoggedIn = this.authService.isAuthenticated();
  }



}
