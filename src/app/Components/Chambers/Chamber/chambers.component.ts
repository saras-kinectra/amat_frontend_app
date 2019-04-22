import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { Location } from '@angular/common';


@Component({

  selector: 'app-chambers',
  templateUrl: './chambers.component.html',
  styleUrls: ['./chambers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChamberComponent implements OnInit {

  public selectedPlatform: any = {};
  chamberSelectable = true;
  public term;
  removable = true;
  addOnBlur = true;
  chamberFormControl = new FormControl();
  isRnDChamberLoading:boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('chamberInput') chamberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  dropDownChambersList: any[] = [];
  chambersList: any[] = [];
  compatibilityChambersList: any = [];
  rndOnlyChambersList: any = [];
  
  selectedChambersList: Array<ChamberModel> = [];

  isRnDChambersEnabled: boolean = false;

  showChambersList: boolean = true;
  showCompatibilityChambersTitle: boolean = false;
  showCompatibilityChambersList: boolean = false;
  showRnDChamberTitle: boolean = false;
  showRnDChamberList: boolean = false;

  isChamberSelected: boolean = false;
  showSelectedChambersClearButton: boolean = false;

  showSelectChamberTitle: boolean = true;
  isCrossLabelCondition = false;
  isButtonLabelCondition = false;
  showErrorLabelCondition: boolean = true;

  finalProductsList: any[] = [];
  formFiledUnderLine: boolean = false;
  public form: FormGroup;

  isCalledServiceAPI: boolean = false;

  extraSelectedChamberCount;

  constructor(private apiService: ApiService, private location: Location, public dialog: MatDialog,
  private fb:FormBuilder,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    localStorage.setItem("ExitButtonVisibility", 'true');

    this.form = this.fb.group({

      chamberInputForm: [null, [Validators.required ]],
    });

    this.formFiledUnderLine = true;
    this.selectedPlatform = JSON.parse(localStorage.getItem('SelectedPlatform'));
    var selectedChambersFromLocal: any[] = JSON.parse(localStorage.getItem('SelectedChambersList'));
    if(selectedChambersFromLocal != null && selectedChambersFromLocal.length > 0) {

      this.selectedChambersList = selectedChambersFromLocal;
      this.findCompatibilityInfoForChamberIds();
    } else {

      this.isRnDChamberLoading = false;
      this.apiService.getChambersByPlatformID(this.selectedPlatform.id).subscribe(response => {
        console.log("ngOnInit getChambersByPlatformID response: ", response);
        
        this.chambersList = JSON.parse(JSON.stringify(response));
        if(this.chambersList.length > 0) {

          this.isRnDChamberLoading = true;

        } else {

          const dialogRef = this.dialog.open(ChamberHttpErrorDialog, {
            panelClass: 'chamberHttpErrorDialogBorderRadius',
            width: '460px',
            // height: 'auto',
            data: {errorMessage: "No chambers found!"}
          });
        
          dialogRef.afterClosed().subscribe(result => {
        
          });
        }
      }, error => {
        
        this.showHttpErrorDailog(error);
      });
    }
  }

  ngAfterViewInit() {
            
    this.chamberInput.nativeElement.focus();
  }

  chambersRemove(chamber): void {

    if(this.isCalledServiceAPI) {

    } else {
      const index = this.selectedChambersList.indexOf(chamber);
      this.selectedChambersList.splice(index, 1);

      if (this.selectedChambersList.length === 0) {

        this.clearAllSelectedChambers();
      } else {

        this.findCompatibilityInfoForChamberIds();
      }
    }
  }

  chamberOptionSelected(event) {

    if(this.isCalledServiceAPI) {

    } else {

      var chamber;
      if (this.isChamberSelected) {
        if(this.isRnDChambersEnabled) {

          chamber = this.getChamberByID(event.option.value.id, this.rndOnlyChambersList);
        } else {

          chamber = this.getChamberByID(event.option.value.id, this.compatibilityChambersList);
        }
      } else {

        chamber = this.getChamberByID(event.option.value.id, this.chambersList);
      }

      console.log("getChamberByID selectedChamber: ", chamber);
      this.filterChambersByID(chamber);
    }
  }

  getChamberByID(chamberID, chamberList) {

    for (let i = 0; i < chamberList.length; i++) {
      if (chamberList[i].id === chamberID) {

        return chamberList[i];
      }
    }
  }

  updateChambersByID(chamber) {

    this.showChamberQtyDialog(chamber, true);
  }

  filterChambersByID(chamber) {

    this.showChamberQtyDialog(chamber, false);
  }

  filterRnDChambersByID(rnDChamber) {

    console.log("filterRnDChambersByID isCalledServiceAPI: ", this.isCalledServiceAPI);
    if(this.isCalledServiceAPI) {

    } else {

      console.log('filterRndChambersByID selectedChamber: ', rnDChamber);
      if (this.isRnDChambersEnabled) {

        this.filterRnDChambers(rnDChamber);
      } else {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '350px',
          height: '215px',
          data: { isEnable: this.isRnDChambersEnabled }
        });

        dialogRef.afterClosed().subscribe(result => {
          var isFrom = localStorage.getItem('IsFrom');
          if (isFrom === "EnableButton") {

            this.isRnDChambersEnabled = JSON.parse(localStorage.getItem('IsRnDEnable'));
            this.showCompatibilityChambersTitle = false;
            this.showCompatibilityChambersList = false;
            this.filterRnDChambers(rnDChamber);
          } else {

          }
        });
      }
    }
    this.chamberInput.nativeElement.value = '';
    this.chamberFormControl.setValue(null);
  }

  filterRnDChambers(rnDChamber) {
    
    this.showChamberQtyDialog(rnDChamber, false);
    this.findCompatibilityInfoForChamberIds();
  }

  findCompatibilityInfoForChamberIds() {

    if(this.selectedChambersList.length > 0) {

      this.showSelectedChambersClearButton = true;
    } else {

      this.showSelectedChambersClearButton = false;
    }

    var selectedChamberIDs: any = [];
    for (let i = 0; i < this.selectedChambersList.length; i++) {

      for(let j = 0; j < this.selectedChambersList[i].qty; j++) {

        selectedChamberIDs.push(this.selectedChambersList[i].id);
      }
    }

    if (selectedChamberIDs.length > this.selectedPlatform.facets_count) {

      this.showErrorLabelCondition = false;
      this.showSelectChamberTitle = false;
      this.isCrossLabelCondition = true;
      this.isButtonLabelCondition = false;
      this.formFiledUnderLine = false;

      this.extraSelectedChamberCount = this.selectedChambersList.length - this.selectedPlatform.facets_count;
    } else {
      
      this.showErrorLabelCondition = true;
      this.showSelectChamberTitle = true;
      this.isCrossLabelCondition = false;
      // this.isButtonLabelCondition = true;
      this.formFiledUnderLine = true;

      if(selectedChamberIDs.length >= this.selectedPlatform.min_facetgroups_count) {

        this.isButtonLabelCondition = true;
      } else {
  
        this.isButtonLabelCondition = false;
      }
    }

    this.isCalledServiceAPI = true;
    this.isRnDChamberLoading = false;
    this.apiService.findCompatibilityInfoForChamberIds(selectedChamberIDs, this.selectedPlatform.id).subscribe(response => {

      console.log("filterCompatibleChambersByID response: ", response);
      var responseList: any = JSON.parse(JSON.stringify(response));
      this.compatibilityChambersList = responseList.compatibleChambers;
      this.rndOnlyChambersList = responseList.rndOnlyChambers;
      this.showChambersList = false;
      this.showCompatibilityChambersTitle = true;
      this.showCompatibilityChambersList = true;
      this.showRnDChamberTitle = true;
      this.showRnDChamberList = true;
      this.isChamberSelected = true;
      this.isCalledServiceAPI = false;
      
      if (this.isChamberSelected) {

        if(this.compatibilityChambersList.length > 0) {

         
          this.isRnDChambersEnabled = false;
        } else {

          
          this.isRnDChambersEnabled = true;
        }
      }

      if(this.compatibilityChambersList.length > 0) {

      
        this.showCompatibilityChambersTitle = true;
        this.showCompatibilityChambersList = true;
      } else {

       
        this.showCompatibilityChambersTitle = false;
        this.showCompatibilityChambersList = false;
      }

      if(this.isRnDChambersEnabled) {

        this.showCompatibilityChambersTitle = false;
        this.showCompatibilityChambersList = false;
      } else {

        this.showRnDChamberTitle = true;
        this.showRnDChamberList = true;
      }

      if(this.rndOnlyChambersList.length > 0) {

        // this.isRnDChamberLoading = true;
        this.showRnDChamberTitle = true;
        this.showRnDChamberList = true;
      } else {

        // this.isRnDChamberLoading = false;
        this.showRnDChamberTitle = false;
        this.showRnDChamberList = false;
      }

      if(this.compatibilityChambersList.length > 0 || this.rndOnlyChambersList.length > 0) {

        this.isRnDChamberLoading = true;
      } else {

        this.isRnDChamberLoading = false;
      }
    }, error => {

      this.showHttpErrorDailog(error);
    });

    this.chamberInput.nativeElement.value = '';
    this.chamberFormControl.setValue(null);
  }

  clearAllSelectedChambers() {

    this.selectedChambersList = [];
    this.showErrorLabelCondition = true;
    this.showSelectChamberTitle = true;
    this.formFiledUnderLine = true;

    this.showChambersList = true;
    this.showCompatibilityChambersTitle = false;
    this.showCompatibilityChambersList = false;
    this.showRnDChamberTitle = false;
    this.showRnDChamberList = false;
    this.isChamberSelected = false;
    this.showSelectedChambersClearButton = false;

    this.isRnDChambersEnabled = false;
    this.isButtonLabelCondition = false;
    this.isRnDChamberLoading = false;
    this.apiService.getChambersByPlatformID(this.selectedPlatform.id).subscribe(response => {

      this.chambersList = JSON.parse(JSON.stringify(response));

      if(this.chambersList.length > 0){

        this.isRnDChamberLoading = true;
      }else{
        this.isRnDChamberLoading = false;
      }

    }, error => {
      
      this.showHttpErrorDailog(error);
    });
  }

  showChamberQtyDialog(selectedChamber, wantToUpdate) {

    const dialogRef = this.dialog.open(ChamberQuantityDialog, {
      width: '391px',
      height: 'auto',
      data:{chamber: selectedChamber, wantToUpdate: wantToUpdate, facetsCount: this.selectedPlatform.facets_count}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      var isFrom = localStorage.getItem('IsQtyDialogFrom');
      var qtyCount: any = localStorage.getItem('QtyDialogCount');
      var selectedDialogChamber = JSON.parse(localStorage.getItem('QtyDialogSelectedChamber'));

      if(isFrom == 'Delelte') {

        if(wantToUpdate) {

          let index = -1;
          for (let i = 0; i < this.selectedChambersList.length; i++) {

            if(this.selectedChambersList[i].id == selectedDialogChamber.id) {

              index = i;
            }
          }
  
          this.selectedChambersList.splice(index, 1);
    
          if (this.selectedChambersList.length === 0) {

            this.clearAllSelectedChambers();
          } else {

            this.findCompatibilityInfoForChamberIds();
          }
        } else {}
      } else if(isFrom == 'Cancel') {

      } else {

        if(this.isCalledServiceAPI) {

        } else {

          if(wantToUpdate) {

            let index = -1;

            for (let i = 0; i < this.selectedChambersList.length; i++) {

              if(this.selectedChambersList[i].id == selectedDialogChamber.id) {

                index = i;
              }
            }
          
            if(qtyCount == 0) {

              this.selectedChambersList.splice(index, 1);
        
              if (this.selectedChambersList.length === 0) {

                this.clearAllSelectedChambers();
              } else {

                this.findCompatibilityInfoForChamberIds();
              }
            } else {
  
              this.selectedChambersList[index].qty = qtyCount;
              this.findCompatibilityInfoForChamberIds();
            }
          } else {

            if(qtyCount <= 0) {

            } else {
  
              let chamberModel = new ChamberModel();
              chamberModel.id = selectedDialogChamber.id;
              chamberModel.name = selectedDialogChamber.name;
              chamberModel.got_code = selectedDialogChamber.got_code;
              chamberModel.qty = qtyCount;
              this.selectedChambersList.push(chamberModel);
              this.findCompatibilityInfoForChamberIds();
            }
          }
        }
      }
    });
  }

  showHttpErrorDailog(error) {

    console.log("error response", error);

    var errorCode = error.status;
    var errorMessage: string = '';

    if(errorCode == '0') {

      errorMessage = 'The server encountered an error. Please try again later';
    } else if(errorCode == '401') {

      errorMessage = 'You’re not authorized to access the resource that you requested';
    } else if(errorCode == '403') {

      errorMessage = 'Sorry, You don’t have permission to access this application';
    } else if(errorCode == '404') {

      errorMessage = 'The resource you’re looking for was not found';
    } else if(errorCode == '500') {

      errorMessage = 'The server encountered an error. Please try again later';
    } else {

      errorMessage = 'Something went wrong and we couldn\'t process your request';
    }

    const dialogRef = this.dialog.open(ChamberHttpErrorDialog, {
      width: '460px',
      height: 'auto',
      data: {errorMessage: errorMessage}
    });
  
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onKeyPress(event: any) {

    if(event.target.value === '') {

      this.dropDownChambersList = [];
    } else {

      if (this.isChamberSelected) {

        if(this.compatibilityChambersList.length > 0) {

          this.dropDownChambersList = this.filterKeyPressedValue(event.target.value, this.compatibilityChambersList);
        } else {

          this.dropDownChambersList = this.filterKeyPressedValue(event.target.value, this.rndOnlyChambersList);
        }
      } else {

        this.dropDownChambersList = this.filterKeyPressedValue(event.target.value, this.chambersList);
      }
    }
  };

  filterKeyPressedValue(searchValue, mChambersList) {

    var mDropDownChambersList: any[] = [];

    for (var i = 0; i < mChambersList.length; i++) {

      if (mChambersList[i].name.toLowerCase().includes(searchValue.toLowerCase()) || mChambersList[i].got_code.toLowerCase().includes(searchValue.toLowerCase())) {
        
        mDropDownChambersList.push(mChambersList[i]);
      }
    }

    return mDropDownChambersList;
  }

  onSearchChamberfocus() {

    this.dropDownChambersList = [];
  }

  outSearchChamberfocus() {

  }

  backButton() {

    localStorage.clear();
    this.location.back();
  }

  submitButton() {

    this.router.navigate(['product'], { relativeTo: this.route });
    localStorage.setItem("SelectedChambersList", JSON.stringify(this.selectedChambersList));
  }
}

@Component({

  selector: 'dialog-overview-example-dialog',
  templateUrl: 'r&d_enable_dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { 

    localStorage.setItem('IsFrom', 'CancelButton');
  }

  rndCancel(): void {

    localStorage.setItem('IsFrom', 'CancelButton');
    this.dialogRef.close();
  }

  rndEnable() {

    localStorage.setItem('IsFrom', 'EnableButton');
    localStorage.setItem('IsRnDEnable', 'true');
    this.dialogRef.close();
  }
}

@Component({

  selector: 'chamber-Http-Error-Dialog',
  templateUrl: 'chamberHttpErrorDialog.html',
})

export class ChamberHttpErrorDialog {

  constructor(public dialogRef: MatDialogRef<ChamberHttpErrorDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  dialogOK() {
    
    this.dialogRef.close();
  }
}

export interface DialogData {

  errorMessage: string;
}

@Component({

  selector: 'ChamberQuantityDialog',
  templateUrl: 'ChamberQuantityDialog.html',
})

export class ChamberQuantityDialog implements OnInit {

  public count : number;
  disabledPlusButton: boolean;
  disabledMinusButton: boolean;
  showDelete: boolean;
  facetsCount;

  constructor(public dialogRef: MatDialogRef<ChamberQuantityDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

    this.facetsCount = data.facetsCount;

    if(data.wantToUpdate) {
      
      this.count = data.chamber.qty;
      this.showDelete = false;

      if(this.count == this.facetsCount) {

        this.disabledPlusButton = true;
        this.disabledMinusButton = false;
      }
    } else {

      this.count = 1;
      this.showDelete = true;
    }
  }

  ngOnInit() {

  }

  decrementQty() {

    this.count = this.count > 0 ? --this.count : 0;

    if(this.count == 0) {

      this.disabledMinusButton = true;
      this.disabledPlusButton = false;
    } else if(this.count <= this.facetsCount) {

      this.disabledMinusButton = false;
      this.disabledPlusButton = false;
    }
  }

  incrementQty() {

    ++this.count;

    if(this.count >= this.facetsCount) {

      this.disabledPlusButton = true;
      this.disabledMinusButton = false;
    } else if(this.count <= this.facetsCount) {

      this.disabledPlusButton = false;
      this.disabledMinusButton = false;
    }
  }

  qtyDialogDelete() {
    
    localStorage.setItem('IsQtyDialogFrom', 'Delelte');
    localStorage.setItem('QtyDialogCount', JSON.parse(JSON.stringify(this.count)));
    localStorage.setItem('QtyDialogSelectedChamber', JSON.stringify(this.data.chamber));
    this.dialogRef.close();
  }

  qtyDialogCancel() {
    
    localStorage.setItem('IsQtyDialogFrom', 'Cancel');
    this.dialogRef.close();
  }

  qtyDialogContinue() {
    
    localStorage.setItem('IsQtyDialogFrom', 'Continue');
    localStorage.setItem('QtyDialogCount', JSON.parse(JSON.stringify(this.count)));
    localStorage.setItem('QtyDialogSelectedChamber', JSON.stringify(this.data.chamber));
    this.dialogRef.close();
  }
}

export interface DialogData {

  chamber;
  wantToUpdate;
  facetsCount;
}

export class ChamberModel {

  id: string;
  name: string;
  got_code: string;
  qty: number;
}