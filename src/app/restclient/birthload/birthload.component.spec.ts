import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthloadComponent } from './birthload.component';

describe('BirthloadComponent', () => {
  let component: BirthloadComponent;
  let fixture: ComponentFixture<BirthloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
