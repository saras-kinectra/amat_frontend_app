import { TokenResponse } from '@openid/appauth';
import { AuthorizationService } from './../authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    public tokenResponse;
    constructor( public authorizationService: AuthorizationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (localStorage.getItem('isAuthorized') == 'true') {

            console.log("isAuthorized",localStorage.getItem('isAuthorized'));
            return true;
        }  else {

            console.log("isAuthorized",localStorage.getItem('isAuthorized'));
            this.authorizationService.authorize();
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        throw new Error("Method not implemented.");
    }
}

