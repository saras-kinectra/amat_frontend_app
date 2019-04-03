import { TokenResponse } from '@openid/appauth';
import { AuthorizationService } from './../../authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'unauthorized',
    templateUrl: 'unAuthorizedcomponent.html',
    styleUrls: ['./unAuthorizedcomponent.css'],
})

export class UnAuthorizedComponent implements OnInit {

    constructor(public authorizationService: AuthorizationService) { }

    ngOnInit() {

     }

}
