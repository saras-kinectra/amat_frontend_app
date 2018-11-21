
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [

  {path:'', redirectTo:'/home', pathMatch: 'full'} ,

{ path:'home', component:HomeComponent,

children:[ 

{ path:'page',component:PageComponent}

] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
