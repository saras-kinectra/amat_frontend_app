import { Location } from '@angular/common';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({

  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProductComponent implements OnInit {

  selectedChamberIDs:any[] = [];
  finalProductsList:any[] = [];
  indexPositionArray:any[] = [];
  tabMenuList:any[] = [];

  @ViewChild('enduraplatform') myId: ElementRef;

  constructor( private apiService: ApiService, private location: Location,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private elem: ElementRef) {

    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/endura-diagram-01.svg'));

    var id = document.getElementById("Layer_1");
    console.log("constructor id", id);

    this.indexPositionArray = [
      {number:"1"}, {number:"2"}, {number:"3"}, {number:"4"}, {number:"5"},
      {number:"C"}, {number:"D"}, {number:"E"}, {number:"F"}
    ]

    this.tabMenuList = [
      {name:'2136'}, {name:'2137'},{name:'2138'}, {name:'2139'}, {name:'2140'}
    ]
  }

  ngOnInit() {
    
    var id = document.getElementById("Layer_1");
    console.log("constructor id", id);

    console.log("Products_Onint_ChamberIDList",localStorage.getItem('SelectedChambersIDObject'));
    
    this.selectedChamberIDs = JSON.parse(localStorage.getItem('SelectedChambersIDObject'));
  
    this.apiService.findProductByChamberIDs(this.selectedChamberIDs).subscribe(response => {

      console.log("Response - findProductByChamberIDs: ", response);

      this.finalProductsList = JSON.parse(JSON.stringify(response));

      console.log("Response - findProductByChamberIDs: length: ", this.finalProductsList.length);
      console.log("Response - findProductByChamberIDs: json: ", this.finalProductsList);
    });
  }

  backButton() {

    this.location.back();
  }

  submitButton() {

  }
}