import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChamberComponent } from './chambers/chambers.component';
import { PlatFormsComponent } from './platforms/platforms.component';
import { ProductsComponent } from './chambers/products/products.component';



const routes: Routes = [


  {path:'', redirectTo:'/dashboard', pathMatch: 'full'} ,


  { path:'dashboard', component:DashboardComponent ,

    children:[  

      { path: '', component: PlatFormsComponent },
      { path:'chambers', component:ChamberComponent ,

    //   children : [
        
    //     { path: 'overview', component: ProductsComponent },
    
    // ]
  }
] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SubRoutingModule { }
