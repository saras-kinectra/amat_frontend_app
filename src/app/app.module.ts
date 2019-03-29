import { AuthGuardService } from './Services/authguard.service';
import { HttpClientModule } from '@angular/common/http';
import { SubModule } from './Components/sub.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Requestor, FetchRequestor } from '@openid/appauth';
import { environment } from './../environments/environment.prod';
import { AuthorizationService } from './authorization.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnvServiceProvider } from './env.service.provider';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SubModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService,
    EnvServiceProvider,
    AuthorizationService,
    { provide: Requestor, useValue: new FetchRequestor()},
    { provide: 'AuthorizationConfig', useValue: environment}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }