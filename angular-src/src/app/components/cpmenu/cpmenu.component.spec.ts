import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmenuComponent } from './cpmenu.component';

describe('CpmenuComponent', () => {
  let component: CpmenuComponent;
  let fixture: ComponentFixture<CpmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
