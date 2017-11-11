import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorechartComponent } from './corechart.component';

describe('CorechartComponent', () => {
  let component: CorechartComponent;
  let fixture: ComponentFixture<CorechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
