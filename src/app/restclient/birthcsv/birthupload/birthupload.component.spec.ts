import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthuploadComponent } from './birthupload.component';

describe('BirthuploadComponent', () => {
  let component: BirthuploadComponent;
  let fixture: ComponentFixture<BirthuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
