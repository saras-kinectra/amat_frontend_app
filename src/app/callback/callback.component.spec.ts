import { DashboardComponent } from './../Components/dashboard/dashboard.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CallbackComponent } from './callback.component';
import { AuthorizationService } from '../authorization.service';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../../environments/environment';
import { Requestor, FetchRequestor } from '@openid/appauth';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppRoutingModule, MatCardModule, MatIconModule, MatProgressSpinnerModule ],
      declarations: [ CallbackComponent, DashboardComponent],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        AuthorizationService,
        { provide: Requestor, useValue: new FetchRequestor()},
        { provide: 'AuthorizationConfig', useValue: environment}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
