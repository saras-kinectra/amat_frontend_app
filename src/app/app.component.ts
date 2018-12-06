import { StorageService } from './Services/storage.service';
import { Model } from './models/model';
import { ApiService } from './Services/api.service';
import { Component, OnInit,HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Applied Materials';
  innerWidth: number;
  model: Model;
  public img;
  sizeNames: any[];
  public modalHeight;
  public modalwidth;

  constructor(private apiService:ApiService,private storageService:StorageService){

    this.model = new Model;

  }


  ngOnInit(){


    this.img = <HTMLImageElement>document.getElementById('modalImageFront');
    // console.log("loggg",this.img.naturalHeight,this.img.naturalWidth);
    // console.log("screen",screen.width,screen.height,window.innerWidth,window.innerHeight);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    event.target.innerWidth;
    // console.log("changing inner width",event.target.innerWidth);
    // console.log("changing inner height",event.target.innerHeight);
  
  }

  }
