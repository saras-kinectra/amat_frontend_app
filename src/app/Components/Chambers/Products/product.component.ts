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

  selectedPlatform: any = {};
  selectedChamberIDs:any[] = [];

  finalProductsList:any[] = [];

  configurationArray:any[] = [];
  dummyConfigurationArray:any[] = [];

  selectedTab: any;

  constructor( private apiService: ApiService, private location: Location,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private elem: ElementRef) {

    this.selectedPlatform = JSON.parse(localStorage.getItem('SelectedPlatform'));
    console.log("ngOnInit selectedPlatformparse: ", JSON.parse(localStorage.getItem('SelectedPlatform')));
    console.log("ngOnInit selectedPlatformname:", this.selectedPlatform.id);

    this.selectedChamberIDs = JSON.parse(localStorage.getItem('SelectedChambersIDObject'));
    console.log("Products_Onint_ChamberIDList", localStorage.getItem('SelectedChambersIDObject'));

    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ssssss2.svg'));
        
        // sanitizer.bypassSecurityTrustResourceUrl('assets/endura-diagram-01.svg'));

    this.dummyConfigurationArray = [
      {number:"1"}, {number:"2"}, {number:"3"}, {number:"4"}, {number:"5"},
      {number:"C"}, {number:"D"}, {number:"E"}, {number:"F"}
    ]
  }

  ngOnInit() {
    
    var id = document.getElementById("Layer_1");
    console.log("constructor id", id);
  
    this.apiService.findProductsForChambers(this.selectedPlatform.id, this.selectedChamberIDs).subscribe(response => {

      console.log("Response - findProductsForChambers: ", response);

      this.finalProductsList = JSON.parse(JSON.stringify(response));

      console.log("Response - findProductsForChambers: length: ", this.finalProductsList.length);
      console.log("Response - findProductsForChambers: json: ", this.finalProductsList);

      this.selectedTab = 0;

      this.configurationArray = this.finalProductsList[this.selectedTab].configuration;
      console.log("getSelectedTab configurationArray: ", this.configurationArray);

      let id = document.getElementById("enduraplatform");
      console.log("getElementsByTagName id", id);

      // document.getElementById('enduraplatform').style.display = 'none';

      document.getElementById("onehover").style.background = 'red';
      document.getElementById("twoactive").style.background = 'red';

      // var id = document.getElementsByTagName("g");
      // console.log("getElementsByTagName id", id);

      // var id: any = <HTMLScriptElement>document.getElementsByTagName("g");
      // var id = (<HTMLCollection<SVGGElement>)document.getElementsByTagName("g");
      // console.log("getElementsByTagName id", id);
      // console.log("getElementsByTagName id", id.length);

      // for (var i = 0; i < id.length; i++) {
      //   console.log("getElementsByTagName: " , id[i].tagName + "<br>");
      // }

    //   var script: HTMLScriptElement = document.getElementsByTagName('g');
    // alert(script.type);

    // var x = document.getElementById("myDIV").querySelectorAll('g');
    // console.log("getElementsByTagName x", x);
    // x[5].style.backgroundColor = "red";  

    // document.getElementById('_x3C_chamber1hover_x3E_').setAttribute("height", "10px");
    // document.getElementById('oneactive').setAttribute("height", "500px");
    // document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")

    // var a = document.getElementById("alphasvg");

    //get the inner DOM of alpha.svg
    // var svgDoc = a.contentDocument;

    //get the inner element by id
    // var delta = svgDoc.getElementById("delta");
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

    var opID = localStorage.getItem('SelectedOPID')

    this.apiService.addOpportunities(opID, opportunityProduct).subscribe(response => {

      console.log("Response - addOpportunities: ", response);

      // this.finalProductsList = JSON.parse(JSON.stringify(response));

      // console.log("Response - addOpportunities: length: ", this.finalProductsList.length);
      // console.log("Response - addOpportunities: json: ", this.finalProductsList);
    });
  }
}