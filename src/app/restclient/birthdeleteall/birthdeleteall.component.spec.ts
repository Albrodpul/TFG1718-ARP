import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdeleteallComponent } from './birthdeleteall.component';

describe('BirthdeleteallComponent', () => {
  let component: BirthdeleteallComponent;
  let fixture: ComponentFixture<BirthdeleteallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdeleteallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdeleteallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
