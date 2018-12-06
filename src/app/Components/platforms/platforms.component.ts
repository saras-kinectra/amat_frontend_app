import { StorageService } from './../../Services/storage.service';
import { ApiService } from './../../Services/api.service';
import { Model } from './../../models/model';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})

export class PlatFormsComponent implements OnInit {

  title = 'Applied Materials';
  public model: Model;
  public platformsList: any[];
  public chambersList: any[];
  public productsList:any[];
  platForm_ID;
  public form: FormGroup;
  
  @ViewChild('opIdInput') opIdInput: ElementRef<HTMLInputElement>;



  constructor(private apiService: ApiService, 
    private storageService: StorageService, 
    private router: Router, private route: ActivatedRoute,private fb:FormBuilder) {

    this.model = new Model;
    this.model.companyName = "Applied Materials";

  }



  // get selectedOptions() {
  //   return this.chambersList
  //             .filter(opt => opt.checked)
  //             .map(opt => opt._id)
  // }


  ngOnInit() {



    this.form = this.fb.group({
      opID: [null, [Validators.required ]],
      platForm: [null, [Validators.required ]]

    });

    this.opIdInput.nativeElement.focus();

    this.apiService.getPlatforms().subscribe(response => {

      console.log("Response - getPlatforms: ", response);

      this.platformsList = JSON.parse(JSON.stringify(response));

      console.log("Response - getPlatforms: json: ", this.platformsList);
    });

  }

  onPlatFormListChange(event) {

  // this.platForm_ID = event._id;
  console.log("console",event._id);



  }

  // onChambersListChange(event) {


  //   var chamberIDs = new Array<string>();
  //   chamberIDs.push(event._id);

  // console.log("Response - chambers: ", chamberIDs);

  //   this.apiService.findProductByChamberIDs(chamberIDs).subscribe(response => {

  //     console.log("Response - findProductByChamberIDs: ", response);

  //     this.productsList = JSON.parse(JSON.stringify(response));

  //     console.log("Response - findProductByChamberIDs: length: ", this.platformsList.length);
  //     console.log("Response - findProductByChamberIDs: json: ", this.platformsList);
  //   });

  // }




    next() {


    localStorage.setItem("platForm_ID",this.platForm_ID);

    this.router.navigate(['chambers'], { relativeTo: this.route });



   
  }


}
