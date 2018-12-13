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

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('chamberInput') chamberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  dropDownChambersList: any[] = [];
  chambersList: any[] = [];
  compatibilityChambersList: any = [];
  rndOnlyChambersList: any = [];
  
  selectedChambersList: any[] = [];

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

  constructor(private apiService: ApiService, private location: Location, public dialog: MatDialog,
  private fb:FormBuilder,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = this.fb.group({

      chamberInputForm: [null, [Validators.required ]],
    });

    this.chamberInput.nativeElement.focus();

    this.selectedPlatform = JSON.parse(localStorage.getItem('SelectedPlatform'));
    console.log("ngOnInit selectedPlatformparse: ", JSON.parse(localStorage.getItem('SelectedPlatform')));

    console.log("ngOnInit selectedPlatformname:", this.selectedPlatform._id);

    this.apiService.getChambersByPlatformID(this.selectedPlatform._id).subscribe(response => {

      console.log("ngOnInit getChambersByPlatformID response: ", response);
      
      this.chambersList = JSON.parse(JSON.stringify(response));
      this.dropDownChambersList = this.chambersList;
    });
  }

  chambersRemove(chamber: string): void {

    const index = this.selectedChambersList.indexOf(chamber);

    this.selectedChambersList.splice(index, 1);
    console.log("chambersRemove SelectedChambers", this.selectedChambersList.length);

    if (this.selectedChambersList.length === 0) {

      this.clearAllSelectedChambers();
    } else {

      this.findCompatibilityInfoForChamberIds();
    }
  }

  chamberOptionSelected(event) {

    console.log("chamberOptionSelected event.option.value._id: ", event.option.value._id);
    console.log("chamberOptionSelected this.isChamberSelected: ", this.isChamberSelected);
    console.log("chamberOptionSelected this.isRnDChambersEnabled: ", this.isRnDChambersEnabled);

    var chamber;

    if (this.isChamberSelected) {

      if(this.isRnDChambersEnabled) {

        chamber = this.getChamberByID(event.option.value._id, this.rndOnlyChambersList);
      } else {

        chamber = this.getChamberByID(event.option.value._id, this.compatibilityChambersList);
      }
    } else {

      chamber = this.getChamberByID(event.option.value._id, this.chambersList);
    }

    console.log("getChamberByID selectedChamber: ", chamber);

    this.filterChambersByID(chamber);
  }

  getChamberByID(chamberID, chamberList) {

    for (let i = 0; i < chamberList.length; i++) {

      console.log("getChamberByID chamberID: ", chamberID);
      console.log("getChamberByID chamberList: ", i,  chamberList[i]);

      if (chamberList[i]._id === chamberID) {

        return chamberList[i];
      }
    }
  }

  filterChambersByID(chamber) {

    console.log('filterChambersByID selectedChamber: ', chamber);

    this.selectedChambersList.push(chamber);

    this.findCompatibilityInfoForChamberIds();
  }

  filterRnDChambersByID(rnDChamber) {

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

        console.log('filterRnDChambersByID dialogRef.afterClosed isFrom', isFrom);
        console.log('filterRnDChambersByID dialogRef.afterClosed', this.isRnDChambersEnabled);

        if (isFrom === "EnableButton") {

          this.isRnDChambersEnabled = JSON.parse(localStorage.getItem('IsRnDEnable'));

          this.showCompatibilityChambersTitle = false;
          this.showCompatibilityChambersList = false;

          this.filterRnDChambers(rnDChamber);
        } else {

        }
      });
    }

    this.chamberInput.nativeElement.value = '';
    this.chamberFormControl.setValue(null);
  }

  filterRnDChambers(rnDChamber) {
    
    console.log('filterRnDChambers selectedChamber: ', rnDChamber);

    this.selectedChambersList.push(rnDChamber);
    this.findCompatibilityInfoForChamberIds();
  }

  findCompatibilityInfoForChamberIds() {

    console.log('findCompatibilityInfoForChamberIds facetsCount: ', this.selectedPlatform.facetsCount);
    console.log('findCompatibilityInfoForChamberIds selectedChambersList.length: ', this.selectedChambersList.length);

    if(this.selectedChambersList.length > 0) {

      this.showSelectedChambersClearButton = true;
      this.isButtonLabelCondition = true;
    } else {

      this.showSelectedChambersClearButton = false;
      this.isButtonLabelCondition = false;
    }

    if (this.selectedChambersList.length > this.selectedPlatform.facetsCount) {

      this.showErrorLabelCondition = false;
      this.showSelectChamberTitle = false;
      this.isCrossLabelCondition = true;
      this.isButtonLabelCondition = false;
      this.formFiledUnderLine = false;
    } else {
      
      this.showErrorLabelCondition = true;
      this.showSelectChamberTitle = true;
      this.isCrossLabelCondition = false;
      this.isButtonLabelCondition = true;
      this.formFiledUnderLine = true ;
    }

    var selectedChamberIDs: any = [];
    for (let i = 0; i < this.selectedChambersList.length; i++) {

      selectedChamberIDs.push(this.selectedChambersList[i]._id);
    }

    console.log("filterRnDChambers Selected Ids", selectedChamberIDs);
    console.log("filterRnDChambers SelectedChambersList:", this.selectedChambersList);

    this.apiService.findCompatibilityInfoForChamberIds(selectedChamberIDs, this.selectedPlatform._id).subscribe(response => {

      console.log("filterCompatibleChambersByID response: ", response);

      var responseList: any = JSON.parse(JSON.stringify(response));

      this.compatibilityChambersList = responseList.compatibleChambers;
      this.rndOnlyChambersList = responseList.rndOnlyChambers;

      console.log("filterCompatibleChambersByID compatibilityChambersList: ", this.compatibilityChambersList);
      console.log("filterCompatibleChambersByID incompatibilityChambersList: ", this.rndOnlyChambersList);

      this.showChambersList = false;
      this.showCompatibilityChambersTitle = true;
      this.showCompatibilityChambersList = true;
      this.showRnDChamberTitle = true;
      this.showRnDChamberList = true;
      this.isChamberSelected = true;
      
      if (this.isChamberSelected) {

        if(this.isRnDChambersEnabled) {

          this.dropDownChambersList = this.rndOnlyChambersList;
        } else {

          this.dropDownChambersList = this.compatibilityChambersList;
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

        this.showRnDChamberTitle = true;
        this.showRnDChamberList = true;
      } else {

        this.showRnDChamberTitle = false;
        this.showRnDChamberList = false;
      }
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

    console.log("clearAllSelectedChambers Platform ID:", this.selectedPlatform._id);

    this.apiService.getChambersByPlatformID(this.selectedPlatform._id).subscribe(response => {

      console.log("clearAllSelectedChambers getChambersByPlatformID response: ", response);

      this.chambersList = JSON.parse(JSON.stringify(response));
      this.dropDownChambersList = this.chambersList;
    });
  }

  backButton() {

    this.location.back();
  }

  submitButton() {

    this.router.navigate(['product'], { relativeTo: this.route });

    var selectedChamberIDs: any = [];

    for (let i = 0; i < this.selectedChambersList.length; i++) {

      selectedChamberIDs.push(this.selectedChambersList[i]._id);
    }

   localStorage.setItem("SelectedChambersIDObject", JSON.stringify(selectedChamberIDs));

    // console.log("selected Ids", selectedChamberIDs);

    // this.apiService.findProductByChamberIDs(selectedChamberIDs).subscribe(response => {

    //   console.log("Response - findProductByChamberIDs: ", response);

    //   this.finalProductsList = JSON.parse(JSON.stringify(response));

    //   console.log("Response - findProductByChamberIDs: length: ", this.finalProductsList.length);
    //   console.log("Response - findProductByChamberIDs: json: ", this.finalProductsList);
    // });
  }
}

@Component({

  selector: 'dialog-overview-example-dialog',
  templateUrl: 'r&d_enable_dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { 

  }

  rndCancel(): void {

    localStorage.setItem('IsFrom', 'CancelButton');
    this.dialogRef.close();
  }

  rndEnable() {

    localStorage.setItem('IsFrom', 'EnableButton');
    localStorage.setItem('IsRnDEnable', 'true');
    console.log("rndEnableClose");
    this.dialogRef.close();
  }
}