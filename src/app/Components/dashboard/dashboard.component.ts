import { ApiService } from './../../Services/api.service';
import { TokenResponse } from '@openid/appauth';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../../authorization.service';

@Component({
  
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  currentUserInfo:any= {}
  currentUser;

  constructor(public dialog: MatDialog,public authorizationService: AuthorizationService,
    public apiService:ApiService) {
  }

  ngOnInit() {

    this.authorizationService.tokenResponse().subscribe((tokenResponse: TokenResponse) => {

        if(tokenResponse != null) {
          this.apiService.getUserInfo().subscribe((userInfo => {
            this.currentUserInfo  = userInfo;
            this.currentUser = this.currentUserInfo.logonUser
            console.log("userINformation",this.currentUserInfo.logonUser);
          }));
        } else {

        }
    });

  }

  showExitDialog() {

    console.log('showExitDialog');
    const dialogRef = this.dialog.open(ExitDialog, {
      width: '350px',
      height: '170px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('showExitDialog dialogRef.afterClosed isFrom');
    });
  }
}

@Component({

  selector: 'exit-dialog',
  templateUrl: 'exit_dialog.html',
})

export class ExitDialog {

  constructor(public dialogRef: MatDialogRef<ExitDialog>, private router: Router, private route: ActivatedRoute) { 
  }

  dialogCancel(): void {

    console.log("Dialog Exit");
    this.dialogRef.close();
  }

  dialogExit() {

    console.log("Dialog Exit");
    this.dialogRef.close();

    localStorage.clear();
    this.router.navigate(['/dashboard']);
  }
}