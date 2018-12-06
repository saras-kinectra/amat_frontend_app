import { Model } from './../../models/model';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from './../../Services/storage.service';
import { ApiService } from './../../Services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  title = 'Applied Materials';
  public model: Model;
  public platformsList: any[];
  public chambersList: any[];
  public productsList: any[];
  public platForm_ID: string;
  array;
  selected;
  public ishidden: boolean;
  public ishiddenProduct: boolean;

  constructor(private apiService: ApiService, private storageService: StorageService, private router: Router, private route: ActivatedRoute) {

    this.model = new Model;
    this.model.companyName = "Applied Materials";
    this.ishidden = true;
    this.ishiddenProduct = true;
  }

  get selectedOptions() {
    return this.chambersList
      .filter(opt => opt.checked)
      .map(opt => opt._id)
  }

  ngOnInit() {

    this.apiService.getPlatforms().subscribe(response => {

      console.log("Response - getPlatforms: ", response);

      this.platformsList = JSON.parse(JSON.stringify(response));

      console.log("Response - getPlatforms: json: ", this.platformsList);
    });
  }

  onPlatFormListChange(event) {

    console.log("platForm_ID");
    this.platForm_ID = event._id;
    console.log("platForm_ID", event._id);
  }

  onChambersListChange(event) {

    var chamberIDs = new Array<string>();
    chamberIDs.push(event._id);

    console.log("Response - chambers: ", chamberIDs);

    this.apiService.findProductByChamberIDs(chamberIDs).subscribe(response => {

      console.log("Response - findProductByChamberIDs: ", response);

      this.productsList = JSON.parse(JSON.stringify(response));

      console.log("Response - findProductByChamberIDs: length: ", this.platformsList.length);
      console.log("Response - findProductByChamberIDs: json: ", this.platformsList);
    });
  }

  onProductChange(event) {

    console.log("Response - Product id: ", event._id);
  }

  next() {

    console.log("array", this.selected);

     this.router.navigate(['centura'], { relativeTo: this.route });

    // console.log("array",this.selectedOptions);
    //  this.ishiddenProduct = false;
    //  this.apiService.findProductByChamberIDs(this.selectedOptions).subscribe(response => {

    //   console.log("Response - findProductByChamberIDs: ", response);

    //   this.productsList = JSON.parse(JSON.stringify(response));

    //   console.log("Response - findProductByChamberIDs: length: ", this.platformsList.length);
    //   console.log("Response - findProductByChamberIDs: json: ", this.platformsList);
    // });



  }

  endura() {

    this.router.navigate(['endura'], { relativeTo: this.route });
  }
}
