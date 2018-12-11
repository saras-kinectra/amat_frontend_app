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
  i;
  public form: FormGroup;

  imgSrc: string = "assets/Icon-Info-Inactive@1x.png";
  
  @ViewChild('opIdInput') opIdInput: ElementRef<HTMLInputElement>;



  constructor(private apiService: ApiService, 
    private storageService: StorageService, 
    private router: Router, private route: ActivatedRoute,private fb:FormBuilder) {

    this.model = new Model;
    this.model.companyName = "Applied Materials";

  }



  ngOnInit() {

    this.form = this.fb.group({
      platForm: [null, [Validators.required ]],
     

    });

    this.opIdInput.nativeElement.focus();

    this.apiService.getPlatforms().subscribe(response => {

      console.log("Response - getPlatforms: ", response);

      this.platformsList = JSON.parse(JSON.stringify(response));

      console.log("Response - getPlatforms: json: ", this.platformsList);
    });

  }

  onPlatFormListChange(event,index) {

  // this.platForm_ID = event._id;
  console.log("onPlatFormListChange",event._id,index);


  }

  onMouseOver(): void {
    this.imgSrc = "assets/info_icon@1x.png";
  }

  onMouseOut(): void {

    this.imgSrc = "assets/Icon-Info-Inactive@1x.png";
    
  }


    next() {

      console.log("onPlatFormListChange",this.i);
      localStorage.setItem("PlatFormObject", JSON.stringify(this.platformsList[this.i]));
    //localStorage.setItem("PlatFormObject",this.platformsList[this.i]);
    console.log("onPlatFormListChange",this.platformsList[this.i]);
    this.router.navigate(['chambers'], { relativeTo: this.route });

  }


}
