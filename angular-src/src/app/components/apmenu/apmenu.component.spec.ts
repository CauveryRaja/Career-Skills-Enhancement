import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmenuComponent } from './apmenu.component';

describe('ApmenuComponent', () => {
  let component: ApmenuComponent;
  let fixture: ComponentFixture<ApmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
