import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberComponent } from './chambers.component';

describe('ChamberComponent', () => {
  let component: ChamberComponent;
  let fixture: ComponentFixture<ChamberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
