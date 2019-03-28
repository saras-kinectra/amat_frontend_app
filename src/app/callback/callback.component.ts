import { AuthorizationService } from './../authorization.service';

// Copyright 2018 Ping Identity
//
// Licensed under the MIT License (the "License"); you may not use this file
// except in compliance with the License.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit } from '@angular/core';
import { RedirectRequestHandler } from '@openid/appauth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})

export class CallbackComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService, public router: Router) { }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.location.hash || window.location.hash.length === 0) {
        const queryString = window.location.search.substring(1); // substring strips '?'
        const path = [window.location.pathname, queryString].join('#');
        window.location.assign(new URL(path, window.location.href).toString());
      } else if (new URLSearchParams(window.location.hash).has('#code')) {
        this.authorizationService.completeAuthorizationRequest().then((tokenResponse) => {
          this.router.navigate(['/dashboard'])
        });
      } else {

        this.router.navigate(['/dashboard'])
        
      }
    });
  }
}
