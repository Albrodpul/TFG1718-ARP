import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthpostComponent } from './birthpost.component';

describe('BirthpostComponent', () => {
  let component: BirthpostComponent;
  let fixture: ComponentFixture<BirthpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
