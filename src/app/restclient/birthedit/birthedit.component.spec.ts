import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirtheditComponent } from './birthedit.component';

describe('BirtheditComponent', () => {
  let component: BirtheditComponent;
  let fixture: ComponentFixture<BirtheditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirtheditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirtheditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
