import { TokenResponse } from '@openid/appauth';
import { UserInfo } from './userinfo';
import { AuthorizationService } from './authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public userInfo: UserInfo | null;
  public authorized: boolean;

  constructor(public authorizationService: AuthorizationService) {

  }

  ngOnInit() {

    this.authorizationService.tokenResponse().subscribe((tokenResponse: TokenResponse) => {
      console.log("tokenResponse",tokenResponse);
        if(tokenResponse != null) {
          localStorage.setItem('isAuthorized', 'true');
        } else {
          localStorage.setItem('isAuthorized', 'false');
        }
    });
  }
}
