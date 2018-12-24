import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
 
import { PlatFormsComponent } from './platforms/platforms.component';
import { LoginComponent } from './login/login.component';
import { ChamberMainModule } from '../Components/Chambers/chamber.module';
import { ChamberMainComponent } from '../Components/Chambers/chambermain.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  // { path: 'login', component: LoginComponent },
 
  {
    path: 'dashboard', component: DashboardComponent,

    children: [

      { path: '', component: PlatFormsComponent },

      { path: 'platform/chambers', component: ChamberMainComponent,
      /* For Dev evnt*/
      loadChildren: () => ChamberMainModule
      /* For Prod evnt*/
      // loadChildren:'../Components/Chambers/chamber.module#ChamberMainModule'
    },
    ]
  }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class SubRoutingModule { }
