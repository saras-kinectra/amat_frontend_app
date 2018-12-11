import { ProductsComponent } from './chambers/products/products.component';
import { ChamberComponent, DialogOverviewExampleDialog } from './chambers/chambers.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { SubRoutingModule } from './sub-routing.module';
import { StorageService } from '../Services/storage.service';
import { ApiService } from 'src/app/Services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, 
  MatSelectModule, 
  MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverlayModule } from '@angular/cdk/overlay';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng2-select';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import 'hammerjs';
import { PlatFormsComponent } from './platforms/platforms.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatMenuModule} from '@angular/material/menu';
import {AccordionModule} from 'primeng/accordion'; 
import {TooltipModule} from 'primeng/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [

    DashboardComponent, PlatFormsComponent,ChamberComponent,DialogOverviewExampleDialog,
    ProductsComponent
    
  ],

  imports: [

    BrowserModule,FormsModule,SelectModule,BrowserAnimationsModule, ReactiveFormsModule, HttpClientModule,
    SubRoutingModule,MatAutocompleteModule, MatButtonModule, MatSelectModule,MatSlideToggleModule,
    MatFormFieldModule, MatInputModule,OverlayModule,OverlayPanelModule,MatCardModule,AccordionModule,TooltipModule,
    MatRippleModule,AccordionModule,MatChipsModule,MatIconModule,Ng2SearchPipeModule,MatMenuModule
    ,MatDialogModule,
  ],

  providers: [ApiService, StorageService,],
  entryComponents: [DialogOverviewExampleDialog ],
  bootstrap: []
})
export class SubModule { }
