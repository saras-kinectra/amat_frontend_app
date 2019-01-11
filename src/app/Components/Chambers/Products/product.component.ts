import { Location } from '@angular/common';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';
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
  selectedProduct: any;

  imageURL: string = "";
  selectedOPID: string = "";

  domIDsList;

  showSVGImage: boolean = true;

  svgColorArray: Array<ColorModel> = [];
  svgDummyColorCodes: any[] = [];

  constructor( private apiService: ApiService, private location: Location, public iconRegistry: MatIconRegistry, public sanitizer: DomSanitizer, private elem: ElementRef, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {

    this.selectedPlatform = JSON.parse(localStorage.getItem('SelectedPlatform'));
    console.log("ngOnInit selectedPlatformparse: ", JSON.parse(localStorage.getItem('SelectedPlatform')));
    console.log("ngOnInit selectedPlatformname:", this.selectedPlatform.id);

    var selectedChambersList: any[] = JSON.parse(localStorage.getItem('SelectedChambersList'));

    // this.selectedChamberIDs = JSON.parse(localStorage.getItem('SelectedChambersList'));
    for (let i = 0; i < selectedChambersList.length; i++) {

      this.selectedChamberIDs.push(selectedChambersList[i].id);
    }
    console.log("Products_Onint_ChamberIDList", localStorage.getItem('SelectedChambersList'));
    console.log("Products_Onint_ChamberIDList", this.selectedChamberIDs);

    this.dummyConfigurationArray = [
      {number:"1"}, {number:"2"}, {number:"3"}, {number:"4"}, {number:"5"},
      {number:"C"}, {number:"D"}, {number:"E"}, {number:"F"}
    ];

    this.svgDummyColorCodes = [
      {"ColorCode": "#EC7063"}, {"ColorCode": "#AF7AC5"}, {"ColorCode": "#58D68D"}, {"ColorCode": "#008080"}, {"ColorCode": "#F4D03F"},
      {"ColorCode": "#99A3A4"}, {"ColorCode": "#5D6D7E"}, {"ColorCode": "#DC7633"}, {"ColorCode": "#A569BD"}
    ];
  }

  ngOnInit() {

    this.apiService.findProductsForChambers(this.selectedPlatform.id, this.selectedChamberIDs).subscribe(response => {

      console.log("Response - findProductsForChambers: ", response);

      this.finalProductsList = JSON.parse(JSON.stringify(response));

      console.log("Response - findProductsForChambers: length: ", this.finalProductsList.length);
      console.log("Response - findProductsForChambers: json: ", this.finalProductsList);

      this.selectedOPID = localStorage.getItem('SelectedOPID');
      console.log("getSelectedTab opID: ", this.selectedOPID);

      if(this.selectedOPID === '') {

        this.selectedOPID = '----';
      }

      this.selectedTab = 0;

      this.selectedProduct = JSON.parse(JSON.stringify(this.finalProductsList[this.selectedTab]));
      console.log("getSelectedTab selectedProduct: ", this.selectedProduct);

      this.imageURL = JSON.parse(JSON.stringify(this.selectedProduct.model_svg_url));
      console.log("getSelectedTab imageURL: ", this.imageURL);
      
      this.iconRegistry.addSvgIcon('productImageIcon', this.sanitizer.bypassSecurityTrustResourceUrl(this.imageURL));

      this.configurationArray = JSON.parse(JSON.stringify(this.selectedProduct.configuration));
      console.log("getSelectedTab configurationArray: ", this.configurationArray.length);

      // this.loadSVGImage();
    }, error => {
      
      this.showHttpErrorDailog(error);
    });
  }

  loadSVGImage() {

    var configurationArray2: any[] = this.configurationArray;
    console.log("getSelectedTab configurationArray2: ", configurationArray2);

    this.svgColorArray = [];
    this.showSVGImage = true;

    setTimeout(()=> {

      this.domIDsList = document.querySelector('object').ownerDocument.documentElement.querySelectorAll('g');
      console.log("setTimeout querySelector domIDsList: ", this.domIDsList);
      
      console.log("setTimeout querySelector domIDsList threeactive: ", this.domIDsList[4].id);
      console.log("setTimeout configurationArray length: ", configurationArray2.length);

      for(var i = 0; i < configurationArray2.length; i++) {

        console.log("setTimeout configurationArray chamber_name: ", configurationArray2[i].chamber_name);

        if(configurationArray2[i].chamber_name == '') {

          for(var j = 0; j < this.domIDsList.length; j++) {
            
            if(this.domIDsList[j].id === configurationArray2[i].facet_name + '-active') {

              this.domIDsList[j].style.visibility = 'hidden';
            } else {

            }

            if(this.domIDsList[j].id === configurationArray2[i].facet_name + '-hover') {

              this.domIDsList[j].style.visibility = 'hidden';
            } else {

            }
          }
        } else {

          let colorModel = new ColorModel();
          colorModel.productName = configurationArray2[i].chamber_name;
          colorModel.productColor = this.svgDummyColorCodes[i].ColorCode;
          this.svgColorArray.push(colorModel);
        }
      }

      this.svgColorArray.forEach((item, index) => {

        if (index !== this.svgColorArray.findIndex(i => i.productName === item.productName)) {

          this.svgColorArray.splice(index, 1);
        }
      });

      console.log("setTimeout configurationArray svgColorArray after length: ", this.svgColorArray);

      for(var i = 0; i < configurationArray2.length; i++) {

        console.log("setTimeout configurationArray chamber_name: ", configurationArray2[i].chamber_name);

        if(configurationArray2[i].chamber_name == '') {


        } else {

          for(var j = 0; j < this.svgColorArray.length; j++) {

            if(configurationArray2[i].chamber_name == this.svgColorArray[j].productName) {
            
              for(var k = 0; k < this.domIDsList.length; k++) {
            
                if(this.domIDsList[k].id === configurationArray2[i].facet_name + '-active') {
    
                  this.domIDsList[k].children[0].children[0].style.fill = this.svgColorArray[j].productColor;
                  this.domIDsList[k].children[0].children[1].style.fill = this.svgColorArray[j].productColor;
                } else {
    
                }
    
                if(this.domIDsList[k].id === configurationArray2[i].facet_name + '-hover') {
    
                  this.domIDsList[k].children[0].children[0].style.fill = this.svgColorArray[j].productColor;
                  this.domIDsList[k].children[0].children[1].style.fill = this.svgColorArray[j].productColor;
                } else {
    
                }
              }
            }
          }
        }
      }

      this.showSVGImage = false;
    }, 1000);
  }

  getSelectedTab(tabPosition) {

    console.log("getSelectedTab tabPosition: ", tabPosition.index);

    this.selectedTab = tabPosition.index;
    console.log("getSelectedTab selectedTab: ", this.selectedTab);

    this.selectedProduct = JSON.parse(JSON.stringify(this.finalProductsList[this.selectedTab]));
    console.log("getSelectedTab selectedProduct: ", this.selectedProduct);

    this.imageURL = JSON.parse(JSON.stringify(this.selectedProduct.model_svg_url));
    console.log("getSelectedTab imageURL: ", this.imageURL);

    this.configurationArray = this.finalProductsList[this.selectedTab].configuration;
    console.log("getSelectedTab configurationArray: ", this.configurationArray);

    this.loadSVGImage();
  }

  productItemMouseOver(configuration, isMouseOver) {
  
    console.log("productItemMouseOver configuration", configuration);
    console.log("productItemMouseOver isMouseOver", isMouseOver);

    this.domIDsList = document.querySelector('object').ownerDocument.documentElement.querySelectorAll('g');
    console.log("productItemMouseOver querySelector domIDsList: ", this.domIDsList);

    for(var i = 0; i < this.domIDsList.length; i++) {
            
      if(this.domIDsList[i].id === configuration.facet_name + '-active') {

        if(configuration.chamber_name == '') {

          if(isMouseOver) {

            this.domIDsList[i].style.visibility = 'visible';

            this.domIDsList[i].children[0].children[0].style.fill = '#c7e2ef';
          } else {

            this.domIDsList[i].style.visibility = 'hidden';
          }
        } else {

          if(isMouseOver) {

            this.domIDsList[i].style.visibility = 'hidden';
          } else {

            this.domIDsList[i].style.visibility = 'visible';
          }
        }
      } else {

      }

      if(this.domIDsList[i].id === configuration.facet_name + '-hover') {

        if(configuration.chamber_name == '') {

          if(isMouseOver) {

            this.domIDsList[i].style.visibility ='visible';
            
            this.domIDsList[i].children[0].children[0].style.fill = '#c7e2ef';
            this.domIDsList[i].children[0].children[1].style.fill = '#c7e2ef';
            console.log("this.domIDsList[i].children[0].children[1]", this.domIDsList[i].children[0].children[1]);
          } else {

            this.domIDsList[i].style.visibility = 'hidden';
          }
        } else {

        }
      } else {

      }
    }
  }

  showHttpErrorDailog(error) {

    console.log("error response", error);
    console.log("error status: ", error.status);
    console.log("error message: ", error.message);
    
    var errorCode = error.status;
    var errorMessage: string = '';

    if(errorCode == '0') {

      errorMessage = 'The server encountered an error. Please try again later';
    } else if(errorCode == '401') {

      errorMessage = 'You’re not authorized to access the resource that you requested';
    } else if(errorCode == '404') {

      errorMessage = 'The resource you’re looking for was not found';
    } else if(errorCode == '500') {

      errorMessage = 'The server encountered an error. Please try again later';
    } else {

      errorMessage = 'Something went wrong and we couldn\'t process your request';
    }

    console.log("error status after if: ", error.status);
    console.log("error message after if: ", error.message);

    const dialogRef = this.dialog.open(ProductHttpErrorDialog, {

      width: '460px',
      height: 'auto',
      data: {errorMessage: errorMessage}
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
      console.log('showPlatialog dialogRef.afterClosed isFrom');
    });
  }

  getRandomColor2() {

    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];

    return hex;
  }

  getRandomColor() {

    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    var hex = '#' + ('000000' + color).slice(-6);
    
    return hex;
  }

  getSVGItemColor(chamberName) {

    for(var i = 0; i < this.svgColorArray.length; i++) {

      console.log("getSVGItemColor chamberName: ", chamberName);
      console.log("getSVGItemColor productName: ", this.svgColorArray[i].productName);
      console.log("getSVGItemColor productColor: ", this.svgColorArray[i].productColor);

      if(chamberName === this.svgColorArray[i].productName) {

        return this.svgColorArray[i].productColor;
      }
    }
  }

  print() {
    
    window.print();
  }

  backButton() {
    
    this.location.back();
  }

  submitButton() {

    console.log("getSelectedTab selectedTab: ", this.selectedTab);
    console.log("getSelectedTab finalProductsList: ", this.finalProductsList[this.selectedTab]);

    var opportunityProduct = JSON.parse(JSON.stringify(this.finalProductsList[this.selectedTab]));
    console.log("getSelectedTab opportunitiProduct: ", opportunityProduct);

    if(this.selectedOPID === '' || this.selectedOPID === '----') {

      console.log('showOPIDDialog');

      const dialogRef = this.dialog.open(OPIDDialog, {

        width: '350px',
        height: '170px',
      });

      dialogRef.afterClosed().subscribe(result => {

        console.log('showOPIDDialog dialogRef.afterClosed isFrom');
      });
    } else {

      this.apiService.addOpportunities(this.selectedOPID, opportunityProduct).subscribe(response => {

        console.log("Response - addOpportunities: ", response);
  
        localStorage.clear();
        this.router.navigate(['/dashboard']);
      }, error => {
      
        this.showHttpErrorDailog(error);
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

@Component({

  selector: 'product-Http-Error_Dialog',
  templateUrl: 'productHttpErrorDialog.html',
})

export class ProductHttpErrorDialog {

  constructor(public dialogRef: MatDialogRef<ProductHttpErrorDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
  }

  dialogOK() {
    
    console.log("Dialog Exit");
    this.dialogRef.close();

    // localStorage.clear();
    // this.router.navigate(['/dashboard']);
  }
}

export interface DialogData {

  errorMessage: string;
}

export class ColorModel {

  productName: string;
  productColor: string;
}