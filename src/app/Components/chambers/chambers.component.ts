import { Model } from './../../models/model';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';

import { Location } from '@angular/common';


@Component({
  selector: 'app-chambers',
  templateUrl: './chambers.component.html',
  styleUrls: ['./chambers.component.css']
})
export class ChamberComponent implements OnInit {

  public term;
  checked: boolean;
  isRnDSelected: boolean = false;
  isErrorLabelHidden: boolean = true;
  public platForm_ID;
  chamberSelectable = true;
  removable = true;
  addOnBlur = true;
  chamberFormControl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  chambersList: any[] = [];
  selectedChambersList: any[] = [];

  @ViewChild('chamberInput') chamberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  productsList: any[] = [];
  compatibilityChambersList: any = [];
  inCompatibilityChambersList: any = [];
  isChamberSelected: boolean = false;

  constructor(private apiService: ApiService, private location: Location) { }

  ngOnInit() {


    this.chamberInput.nativeElement.focus();

    this.platForm_ID = localStorage.getItem('platForm_ID');
    console.log("ngOnInit platForm_ID: ", this.platForm_ID);

    this.apiService.getChambersByPlatformID(this.platForm_ID).subscribe(response => {

      console.log("ngOnInit getChambersByPlatformID response: ", response);
      this.chambersList = JSON.parse(JSON.stringify(response));
    });
  }


  onRnDChangeEvent(value) {

    if (value.checked === true) {

      this.isRnDSelected = true;
    } else {

      this.isRnDSelected = false;
    }

    var selectedChamberIDs: any = [];
        for (let i = 0; i < this.selectedChambersList.length; i++) {
          selectedChamberIDs.push(this.selectedChambersList[i]._id);
        }

        console.log("selected Ids", selectedChamberIDs);
        console.log("this.selectedChambersList:", this.selectedChambersList);

        this.apiService.findCompatibilityInfoForChamberIds(selectedChamberIDs, this.platForm_ID, this.isRnDSelected).subscribe(response => {

          console.log("findCompatibilityInfoForChamberIds response: ", response);
          var responseList: any = JSON.parse(JSON.stringify(response));
          console.log("this.compatibilityChambersList response Split: ", responseList.compatibleChambers);
          console.log("this.compatibilityChambersList response Split: ", responseList.incompatibleChambers);

          this.compatibilityChambersList = responseList.compatibleChambers;
          this.inCompatibilityChambersList = responseList.incompatibleChambers;
        });
  }

  chambersRemove(chamber: string): void {

    const index = this.selectedChambersList.indexOf(chamber);

    this.chambersList.push(this.selectedChambersList[index]);

    this.selectedChambersList.splice(index, 1);
    console.log("this.SelectedChambers", this.selectedChambersList.length);

    if (this.selectedChambersList.length > 9) {

      this.isErrorLabelHidden = false;


    } else {

      this.isErrorLabelHidden = true;

    }

    var selectedChamberIDs: any = [];
    for (let i = 0; i < this.selectedChambersList.length; i++) {
      selectedChamberIDs.push(this.selectedChambersList[i]._id);
    }

    console.log("selected Ids", selectedChamberIDs);
    console.log("this.selectedChambersList:", this.selectedChambersList);

    this.apiService.findCompatibilityInfoForChamberIds(selectedChamberIDs, this.platForm_ID, this.isRnDSelected).subscribe(response => {

      console.log("findCompatibilityInfoForChamberIds response: ", response);
      var responseList: any = JSON.parse(JSON.stringify(response));
      console.log("this.compatibilityChambersList response Split: ", responseList.compatibleChambers);
      console.log("this.compatibilityChambersList response Split: ", responseList.incompatibleChambers);

      this.compatibilityChambersList = responseList.compatibleChambers;
      this.inCompatibilityChambersList = responseList.incompatibleChambers;
    });

    if (this.selectedChambersList.length === 0) {

      this.isChamberSelected = false;
    } else {

      this.isChamberSelected = true;
    }
  }

  chamberOptionSelected(event) {

    if (this.isChamberSelected) {

      this.filterCompatibleChambersByID(event.option.value._id);
    } else {

      this.filterChambersByID(event.option.value._id);
    }
  }

  filterChambersByID(id) {

    for (let i = 0; i < this.chambersList.length; i++) {

      // console.log("filterChambersByID before selectedChambersList for _id: ", i , this.chambersList[i]._id);
      // console.log("filterChambersByID after chambersList: ", i,  this.chambersList[i]._id );

      if (this.chambersList[i]._id === id) {

        // console.log("filterChambersByID before selectedChambersList for _id: ", i, this.chambersList[i]._id);
        // console.log("filterChambersByID event.option.viewValue: ", event.option.value._id);

        this.selectedChambersList.push(this.chambersList[i]);

        var selectedChamberIDs: any = [];
        for (let i = 0; i < this.selectedChambersList.length; i++) {
          selectedChamberIDs.push(this.selectedChambersList[i]._id);
        }

        console.log("selected Ids", selectedChamberIDs);
        console.log("this.selectedChambersList:", this.selectedChambersList);

        this.apiService.findCompatibilityInfoForChamberIds(selectedChamberIDs, this.platForm_ID, this.isRnDSelected).subscribe(response => {

          console.log("findCompatibilityInfoForChamberIds response: ", response);
          var responseList: any = JSON.parse(JSON.stringify(response));
          console.log("this.compatibilityChambersList response Split: ", responseList.compatibleChambers);
          console.log("this.compatibilityChambersList response Split: ", responseList.incompatibleChambers);

          this.compatibilityChambersList = responseList.compatibleChambers;
          this.inCompatibilityChambersList = responseList.incompatibleChambers;

          this.isChamberSelected = true;
        });


        // console.log("filterChambersByID after selectedChambersList: ", this.selectedChambersList);

        this.chambersList.splice(i, 1);
      }
    }

    // console.log("filterChambersByID selectedChambersList length: ", this.selectedChambersList.length);
    // console.log("filterChambersByID chambersList length: ", this.chambersList.length);

    this.chamberInput.nativeElement.value = '';
    this.chamberFormControl.setValue(null);
  }

  filterCompatibleChambersByID(id) {

    for (let i = 0; i < this.compatibilityChambersList.length; i++) {

      // console.log("filterCompatibleChambersByID before selectedChambersList for _id: ", i , this.chambersList[i]._id);
      // console.log("filterCompatibleChambersByID after chambersList: ", i,  this.chambersList[i]._id );

      if (this.compatibilityChambersList[i]._id === id) {

        // console.log("filterCompatibleChambersByID before selectedChambersList for _id: ", i, this.chambersList[i]._id);
        // console.log("filterCompatibleChambersByID event.option.viewValue: ", event.option.value._id);

        this.selectedChambersList.push(this.compatibilityChambersList[i]);

        var selectedChamberIDs: any = [];
        for (let i = 0; i < this.selectedChambersList.length; i++) {
          selectedChamberIDs.push(this.selectedChambersList[i]._id);
        }

        console.log("selected Ids", selectedChamberIDs);
        console.log("this.selectedChambersList:", this.selectedChambersList);

        this.apiService.findCompatibilityInfoForChamberIds(selectedChamberIDs, this.platForm_ID, this.isRnDSelected).subscribe(response => {

          console.log("findCompatibilityInfoForChamberIds response: ", response);
          var responseList: any = JSON.parse(JSON.stringify(response));
          console.log("this.compatibilityChambersList response Split: ", responseList.compatibleChambers);
          console.log("this.compatibilityChambersList response Split: ", responseList.incompatibleChambers);

          this.compatibilityChambersList = responseList.compatibleChambers;
          this.inCompatibilityChambersList = responseList.incompatibleChambers;

          this.isChamberSelected = true;
        });


        // console.log("filterCompatibleChambersByID after selectedChambersList: ", this.selectedChambersList);

        this.compatibilityChambersList.splice(i, 1);
      }
    }

    // console.log("filterCompatibleChambersByID selectedChambersList length: ", this.selectedChambersList.length);
    // console.log("filterCompatibleChambersByID chambersList length: ", this.chambersList.length);

    this.chamberInput.nativeElement.value = '';
    this.chamberFormControl.setValue(null);
  }


  
  backButton() {

    this.location.back();

  }

  nextButton() {

    if (this.selectedChambersList.length > 9) {

      this.isErrorLabelHidden = false;
    

    } else {

      // this.isErrorLabelHidden = true;

      var selectedChamberIDs: any = [];

      for (let i = 0; i < this.selectedChambersList.length; i++) {

        selectedChamberIDs.push(this.selectedChambersList[i]._id);

      }

      console.log("selected Ids", selectedChamberIDs);

      this.apiService.findProductByChamberIDs(selectedChamberIDs).subscribe(response => {

        console.log("Response - findProductByChamberIDs: ", response);

        this.productsList = JSON.parse(JSON.stringify(response));

        console.log("Response - findProductByChamberIDs: length: ", this.productsList.length);
        console.log("Response - findProductByChamberIDs: json: ", this.productsList);
      });
    }
  }
}