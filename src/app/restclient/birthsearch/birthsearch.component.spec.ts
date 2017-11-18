import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthsearchComponent } from './birthsearch.component';

describe('BirthsearchComponent', () => {
  let component: BirthsearchComponent;
  let fixture: ComponentFixture<BirthsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
