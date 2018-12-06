import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatFormsComponent } from './platforms.component';

describe('PlatFormsComponent', () => {
  let component: PlatFormsComponent;
  let fixture: ComponentFixture<PlatFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
