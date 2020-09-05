import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgmenuComponent } from './lgmenu.component';

describe('LgmenuComponent', () => {
  let component: LgmenuComponent;
  let fixture: ComponentFixture<LgmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
