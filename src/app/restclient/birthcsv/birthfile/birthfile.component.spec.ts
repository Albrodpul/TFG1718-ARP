import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthfileComponent } from './birthfile.component';

describe('BirthfileComponent', () => {
  let component: BirthfileComponent;
  let fixture: ComponentFixture<BirthfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
