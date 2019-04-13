import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { RedirectRequestHandler } from '@openid/appauth';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformHttpErrorDialog } from '../Components/platforms/platforms.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})

export class CallbackComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService, public dialog: MatDialog, public router: Router) { }

  ngOnInit() {

    if( document.readyState !== 'loading' ) {
        console.log( 'document is already ready, just execute code here' );
        this.handleCallback();
    } else {
        document.addEventListener('DOMContentLoaded', this.handleCallback.bind(this));
    }
  
  }

  handleCallback()
  {
    if (!window.location.hash || window.location.hash.length === 0) {
      const queryString = window.location.search.substring(1); // substring strips '?'
      const path = [window.location.pathname, queryString].join('#');
      const newUrl = new URL(path, window.location.href).toString();
      
      window.location.assign(newUrl);

      

    } else if (new URLSearchParams(window.location.hash).has('#code')) {

      this.authorizationService.completeAuthorizationRequest().then((tokenResponse) => {
        this.router.navigate(['/'])
      }).catch((error) => {

        const dialogRef = this.dialog.open(PlatformHttpErrorDialog, {

          panelClass: 'platformHttpErrorDialogBorderRadius',
          width: '460px',
          // height: 'auto',
          data: {errorMessage: error, errorCode: 500}
        });
      
        dialogRef.afterClosed().subscribe(result => {
      
        });

      });
    } else {
      this.router.navigate(['/'])
      
    }
  }
}
