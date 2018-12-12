import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubModule } from './Components/sub.module';
import { SubRoutingModule} from './Components/sub-routing.module';

import { SelectModule } from 'ng2-select';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, SelectModule, BrowserAnimationsModule, MatChipsModule,
     AppRoutingModule, SubModule,HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
