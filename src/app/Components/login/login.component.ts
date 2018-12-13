import { StorageService } from './../../Services/storage.service';
import { ApiService } from './../../Services/api.service';

import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  title = 'Applied Materials';

  userName: string = "";
  password: string = "";
  disableLoginButton: boolean = true;
  showLoginErrorMessage: boolean = false;
  labelError: boolean = false;
  submitted: boolean = false;
  constructor(private apiService: ApiService, private storageService: StorageService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  onKeyUp(event: any) {

    console.log("onKeyUp userName: ", this.userName);
    console.log("onKeyUp password: ", this.password);

    if (this.userName && this.password) {

      console.log('SuccessCase');

      this.disableLoginButton = false;
      this.showLoginErrorMessage = false;
      this.labelError = false;
      this.submitted = false;
    } else {

      console.log('FailureCase');

      this.disableLoginButton = true;     
    }
  }
  onFocus() {

    this.showLoginErrorMessage = false;
    this.labelError = false;
    this.submitted = false;
  }

  login(): void {

    console.log("login userName: ", this.userName);
    console.log("login password: ", this.password);

    if (this.userName === 'abc' && this.password === 'abc') {

      this.router.navigate(['/dashboard']);

      console.log('login Success');

      this.disableLoginButton = false;
      this.showLoginErrorMessage = false;
    } else {

      console.log('login Failure');

      this.disableLoginButton = true;
      this.showLoginErrorMessage = true;
      this.labelError = true;
      this.submitted = true;
    }
  }
}