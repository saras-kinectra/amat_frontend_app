import { TokenResponse, AuthorizationServiceConfiguration } from '@openid/appauth';
import { AuthorizationService } from './authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService,private router:Router ) {}

  ngOnInit() {

    // this.authorizationService.tokenResponse().subscribe((tokenResponse: TokenResponse) => {
    //     if(tokenResponse != null) {
    //       localStorage.setItem('isAuthorized', 'true');
    //     } else {
    //       localStorage.setItem('isAuthorized', 'false');
    //     }
    // });
  }
}
