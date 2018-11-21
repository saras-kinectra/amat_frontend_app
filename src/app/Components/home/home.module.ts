import { StorageService } from './../../Services/storage.service';
import { HomeComponent } from './home.component';
import { ApiService } from 'src/app/Services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { PageComponent } from './page/page.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,MatSelectModule 
} from '@angular/material';




@NgModule({
  declarations: [
    HomeComponent, PageComponent
  ],

  imports: [
    BrowserModule,FormsModule,BrowserAnimationsModule,ReactiveFormsModule,HttpClientModule,
    HomeRoutingModule,MatAutocompleteModule,MatButtonModule,MatSelectModule,
    MatFormFieldModule, MatInputModule,
    MatRippleModule,
  ],

  providers: [ApiService,StorageService],
  bootstrap: []
})
export class HomeModule { }
