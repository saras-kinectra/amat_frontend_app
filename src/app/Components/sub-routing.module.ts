import { UnAuthorizedComponent } from './unAuthorized/unAuthorizedcomponent';
import { AuthGuardService } from './../Services/authguard.service';
import { NgModule, isDevMode } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlatFormsComponent } from './platforms/platforms.component';
import { ChamberMainComponent } from '../Components/Chambers/chambermain.component';
import { CallbackComponent } from '../callback/callback.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'callback',  component: CallbackComponent },
  { path: 'unauthorized', component: UnAuthorizedComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardService],

    children: [
      { path: '', component: PlatFormsComponent },
      { path: 'platform/chambers', component: ChamberMainComponent,
      loadChildren:'../Components/Chambers/chamber.module#ChamberMainModule'},
    ]
  }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class SubRoutingModule { }


