import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaptitudeComponent } from './taptitude.component';

describe('TaptitudeComponent', () => {
  let component: TaptitudeComponent;
  let fixture: ComponentFixture<TaptitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaptitudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaptitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
