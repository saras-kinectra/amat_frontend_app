
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { StorageService } from './../../Services/storage.service';
import { ApiService } from './../../Services/api.service';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({

  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PlatFormsComponent implements OnInit {

  public platformsList: any[];
  selectedPosition;
  public form: FormGroup;

  toolTipIcon: string = "assets/Icon-Info-Inactive@1x.png";

  @ViewChild('opIdInput') opIdInput: ElementRef<HTMLInputElement>;

  constructor(private apiService: ApiService, private storageService: StorageService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({

      platform: [null, [Validators.required]],
    });

    this.opIdInput.nativeElement.focus();

    this.apiService.getPlatforms().subscribe(response => {

      console.log("Response - getPlatforms: ", response);

      this.platformsList = JSON.parse(JSON.stringify(response));

      console.log("Response - getPlatforms: json: ", this.platformsList);
    }, error => {
      
      console.log("error response",error);

      const dialogRef = this.dialog.open(PlatformHttpErrorDialog, {

        width: '360px',
        height: '170px',
      });
    
      dialogRef.afterClosed().subscribe(result => {
    
        console.log('showPlatialog dialogRef.afterClosed isFrom');
      });
    });
  }

  onPlatFormListChange(event, index) {

    console.log("onPlatFormListChange", event._id, index);
  }

  onToolTipMouseOver(): void {

    this.toolTipIcon = "assets/info_icon@1x.png";
  }

  onToolTipMouseOut(): void {

    this.toolTipIcon = "assets/Icon-Info-Inactive@1x.png";
  }

  next() {

    console.log("next selectedPosition: ", this.selectedPosition);
    console.log("next opID: ", this.opIdInput.nativeElement.value);

    localStorage.setItem("SelectedPlatform", JSON.stringify(this.platformsList[this.selectedPosition]));
    localStorage.setItem("SelectedOPID", this.opIdInput.nativeElement.value);

    console.log("next selected platform: ", this.platformsList[this.selectedPosition]);

    this.router.navigate(['platform/chambers'], { relativeTo: this.route });
  }
}

@Component({

  selector: 'platform-Http-Error-dialog',
  templateUrl: 'patformHttpErrorDialog.html',
})

export class PlatformHttpErrorDialog {

  constructor(public dialogRef: MatDialogRef<PlatformHttpErrorDialog>) { 
  }

  dialogOK() {
    
    console.log("Dialog Exit");
    this.dialogRef.close();

    // localStorage.clear();
    // this.router.navigate(['/dashboard']);
  }
}