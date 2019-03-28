import { AuthorizationService } from './../authorization.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor( public authorizationService: AuthorizationService,
        private apiService: ApiService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (localStorage.getItem('isAuthorized') == 'true') {
            console.log("true");
            return true;
        }  else {

            console.log("false");
            this.authorizationService.authorize();
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        throw new Error("Method not implemented.");
    }
    
}

