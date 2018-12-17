import { Location } from '@angular/common';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({

  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProductComponent implements OnInit {

  selectedPlatform: any = {};
  selectedChamberIDs:any[] = [];

  finalProductsList:any[] = [];

  configurationArray:any[] = [];
  dummyConfigurationArray:any[] = [];

  selectedTab: any;

  constructor( private apiService: ApiService, private location: Location,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private elem: ElementRef, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {

    this.selectedPlatform = JSON.parse(localStorage.getItem('SelectedPlatform'));
    console.log("ngOnInit selectedPlatformparse: ", JSON.parse(localStorage.getItem('SelectedPlatform')));
    console.log("ngOnInit selectedPlatformname:", this.selectedPlatform.id);

    this.selectedChamberIDs = JSON.parse(localStorage.getItem('SelectedChambersIDObject'));
    console.log("Products_Onint_ChamberIDList", localStorage.getItem('SelectedChambersIDObject'));

    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/endura-diagram-01.svg'));
        
    this.dummyConfigurationArray = [
      {number:"1"}, {number:"2"}, {number:"3"}, {number:"4"}, {number:"5"},
      {number:"C"}, {number:"D"}, {number:"E"}, {number:"F"}
    ]
  }

  ngOnInit() {
  
    this.apiService.findProductsForChambers(this.selectedPlatform.id, this.selectedChamberIDs).subscribe(response => {

      console.log("Response - findProductsForChambers: ", response);

      this.finalProductsList = JSON.parse(JSON.stringify(response));

      console.log("Response - findProductsForChambers: length: ", this.finalProductsList.length);
      console.log("Response - findProductsForChambers: json: ", this.finalProductsList);

      this.selectedTab = 0;

      this.configurationArray = this.finalProductsList[this.selectedTab].configuration;
      console.log("getSelectedTab configurationArray: ", this.configurationArray);
    });
  }

  getSelectedTab(tabPosition) {

    console.log("getSelectedTab tabPosition: ", tabPosition.index);

    this.selectedTab = tabPosition.index;
    console.log("getSelectedTab selectedTab: ", this.selectedTab);

    this.configurationArray = this.finalProductsList[this.selectedTab].configuration;
    console.log("getSelectedTab configurationArray: ", this.configurationArray);
  }

  backButton() {

    this.location.back();
  }

  submitButton() {

    console.log("getSelectedTab selectedTab: ", this.selectedTab);
    console.log("getSelectedTab finalProductsList: ", this.finalProductsList[this.selectedTab]);

    var opportunityProduct = JSON.parse(JSON.stringify(this.finalProductsList[this.selectedTab]));
    console.log("getSelectedTab opportunitiProduct: ", opportunityProduct);

    var opID: string = localStorage.getItem('SelectedOPID');
    console.log("getSelectedTab opID: ", opID);

    if(opID === '') {

      console.log('showOPIDDialog');

      const dialogRef = this.dialog.open(OPIDDialog, {

        width: '350px',
        height: '170px',
      });

      dialogRef.afterClosed().subscribe(result => {

        console.log('showOPIDDialog dialogRef.afterClosed isFrom');
      });
    } else {

      this.apiService.addOpportunities(opID, opportunityProduct).subscribe(response => {

        console.log("Response - addOpportunities: ", response);
  
        localStorage.clear();
        this.router.navigate(['/dashboard']);
      });
    }
  }
}

@Component({

  selector: 'opid-dialog',
  templateUrl: 'opid_dialog.html',
})

export class OPIDDialog {

  constructor(public dialogRef: MatDialogRef<OPIDDialog>) { 
  }

  dialogOK() {
    
    console.log("Dialog Exit");
    this.dialogRef.close();

    // localStorage.clear();
    // this.router.navigate(['/dashboard']);
  }
}