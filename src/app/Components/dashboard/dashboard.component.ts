import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
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

    // localStorage.setItem('IsFrom', 'CancelButton');
  }

  dialogCancel(): void {

    // localStorage.setItem('IsFrom', 'CancelButton');
    console.log("Dialog Exit");
    this.dialogRef.close();
  }

  dialogExit() {

    // localStorage.setItem('IsFrom', 'EnableButton');
    // localStorage.setItem('IsRnDEnable', 'true');
    console.log("Dialog Exit");
    this.dialogRef.close();

    localStorage.clear();
    this.router.navigate(['/login']);
  }
}