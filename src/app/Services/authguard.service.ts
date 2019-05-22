import { JwtHelperService } from '@auth0/angular-jwt';
import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthorizationService } from './../authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const jwtHelperService = new JwtHelperService()

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    public tokenResponse;
    
    constructor( public authorizationService: AuthorizationService,public router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean{

        return this.authorizationService.tokenResponse().pipe(map(token => {

            return true;
            
            if (token) {

                // console.log('authenticated: ', token.accessToken);
                const decodedToken = jwtHelperService.decodeToken(token.accessToken);
                console.log('decodedToken: ', decodedToken,decodedToken);

                if(decodedToken.role) {

                    if (decodedToken.role == 'user' || decodedToken.role == 'admin'){

                        return true;
                    } else {

                        this.router.navigate(['unauthorized']);
                        return false;
                    }
                } else {

                    this.router.navigate(['unauthorized']);
                    return false;
                }
            } else {

                console.log('not-authenticated');
                this.authorizationService.authorize();
                return false;
            }
        }));
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        throw new Error("Method not implemented.");
    }
}