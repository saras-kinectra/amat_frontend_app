import { AuthorizationService } from './../authorization.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
// import { AuthService }      from './auth.service';
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {


    public roleId;

    public loggedIn = new BehaviorSubject<boolean>(false);

    constructor( public authorizationService: AuthorizationService,private apiService: ApiService, private storageService: StorageService, private router: Router) {

        this.roleId = localStorage.getItem('roleId');


    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let url: string = state.url;
        // return this.verifyLogin(url);
        if (localStorage.getItem('isAuthorized') == 'true') {
            console.log("true");
            return true;
        }  else {

            console.log("false");
            this.authorizationService.authorize();
            return false;
        }

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


        if (this.roleId === 1) {

            // this.router.navigateByUrl('/dashboard');

            return true;
        } else {

            console.log('Unauthorized to open link: ' + state.url);

            return false;
        }
    }

    verifyLogin(url): boolean {

        if (this.isLoggedIn()) {
            // this.router.navigate(['/login']);
           
            return true;
        } else if (!this.isLoggedIn()) {

            console.log("unAutherised");
            window.alert("unAutherised");
            return false;
        }

    }

    public isLoggedIn(): boolean {

        let status = false;
        if (localStorage.getItem('isAuthorized') == 'true') {
            status = true;
        }  else {
            status = false;
        }
        return status;
    }

}
