import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapmenuComponent } from './tapmenu.component';

describe('TapmenuComponent', () => {
  let component: TapmenuComponent;
  let fixture: ComponentFixture<TapmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
