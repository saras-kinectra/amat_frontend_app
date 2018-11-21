import { StorageService } from './Services/storage.service';
import { Model } from './models/model';
import { ApiService } from './Services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Applied Materials';

  model: Model;
  sizeNames: any[];


  constructor(private apiService:ApiService,private storageService:StorageService){

    this.model = new Model;

  }

  ngOnInit(){

  }


  
  }
