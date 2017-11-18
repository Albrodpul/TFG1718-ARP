import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthgetComponent } from './birthget.component';

describe('BirthgetComponent', () => {
  let component: BirthgetComponent;
  let fixture: ComponentFixture<BirthgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
