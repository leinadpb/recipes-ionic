import { Component, OnInit, Input } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { AddproductPage } from '../addproduct/addproduct';

import { ConfigService } from '../../services/config-service';
import { UserInfoService } from '../../services/user-info/UserInfoService';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  private homePage = HomePage;
  private profilePage = ProfilePage;
  private aboutPage = AboutPage;
  private addProductPage = AddproductPage;

  private isProvider: boolean = true; // Get this from auth service


  @Input() private homeTitle: string;
  @Input() private aboutTitle: string;
  @Input() private contactTitle: string;
  @Input() private profileTitle: string;

  constructor(private configs: ConfigService, private user: UserInfoService) {
    if (user.type === 'WATCHER') {
      this.isProvider = false;
    }else {
      this.isProvider = true;
    }
    console.log(user);
    console.log(`USER TYPE IS: ${user.type}`);
  }

  ngOnInit(): void {
    this.configs.getJSON().subscribe(data => {
      this.homeTitle = data['APP_NAME'];
      this.aboutTitle = data['APP_NAME'];
      this.contactTitle = data['APP_NAME'];
    });
  }
}
