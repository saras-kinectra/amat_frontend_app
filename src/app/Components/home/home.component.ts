import { StorageService } from './../../Services/storage.service';
import { ApiService } from './../../Services/api.service';
import { Model } from './../../models/model';



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'Applied Materials';

  model: Model;
  sizeNames: any[];
  idArray:any[];
  public ishidden:boolean;
  id;
  one;
  two;
  three;

  constructor(private apiService:ApiService,private storageService:StorageService,
    private router: Router, private route: ActivatedRoute){

    this.model = new Model;
    this.model.companyName="Applied Materials";
    this.ishidden = true;

    this.idArray=[

    {"id":1},{"id":2},{"id":3},{"id":4}

    ]

  }

  ngOnInit(){

   //this.storageService.setData('ProductTypeId', this.model.id);


  }


  onProfileChange(obj) {


    this.model.id = obj.id;

    this.ishidden = false;
  
    this.apiService.getId(this.model).subscribe( response=>{

      console.log("response",response);
      this.sizeNames = JSON.parse(JSON.stringify(response));


    });


  }

  submit(){

    console.log(this.model.id);
    
    this.router.navigate(['page'], { relativeTo: this.route });

  }


  }
