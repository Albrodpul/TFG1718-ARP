import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdeleteComponent } from './birthdelete.component';

describe('BirthdeleteComponent', () => {
  let component: BirthdeleteComponent;
  let fixture: ComponentFixture<BirthdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
