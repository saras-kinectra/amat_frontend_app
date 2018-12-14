import { StorageService } from './../../Services/storage.service';
import { DialogOverviewExampleDialog } from './Chamber/chambers.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChamberMainComponent } from './chambermain.component';
import { ChamberMainRoutingModule } from './chamber_route.module';
import {ChamberComponent } from '../Chambers/Chamber/chambers.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatMenuModule} from '@angular/material/menu';
import {AccordionModule} from 'primeng/accordion'; 
import {TooltipModule} from 'primeng/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MatCardModule} from '@angular/material/card';
import { SelectModule } from 'ng2-select';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, 
  MatSelectModule, 
  MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material';
import { ProductComponent } from './Products/product.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({

  declarations: [

    ChamberMainComponent,
    ChamberComponent,
    DialogOverviewExampleDialog,
    ProductComponent
  ],

  imports: [

    CommonModule,
    FormsModule,
    RouterModule,
    ChamberMainRoutingModule,
    MatDividerModule
    ,MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    AccordionModule,
    MatListModule,
    SelectModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
    OverlayPanelModule,
    MatIconModule,
    Ng2SearchPipeModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatCardModule,
    TooltipModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatTabsModule
  ],

  providers: [
    
    ApiService, 
    StorageService
  ],

  entryComponents: [
    
    DialogOverviewExampleDialog
  ],

  bootstrap: []
})

export class ChamberMainModule { }