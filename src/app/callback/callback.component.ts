import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { RedirectRequestHandler } from '@openid/appauth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})

export class CallbackComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService,public router: Router) { }

  ngOnInit() {

    document.addEventListener('DOMContentLoaded', () => {
      if (!window.location.hash || window.location.hash.length === 0) {
        
        const queryString = window.location.search.substring(1); // substring strips '?'
        const path = [window.location.pathname, queryString].join('#');
        window.location.assign(new URL(path, window.location.href).toString());
      } else if (new URLSearchParams(window.location.hash).has('#code')) {

        this.authorizationService.completeAuthorizationRequest().then((tokenResponse) => {
       this.router.navigate(['/dashboard']);
        });
      } else {

        this.router.navigate(['/dashboard']);
      }
    });
  }
}
