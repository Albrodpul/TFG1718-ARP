import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JqueryclientComponent } from './jqueryclient.component';

describe('JqueryclientComponent', () => {
  let component: JqueryclientComponent;
  let fixture: ComponentFixture<JqueryclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqueryclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqueryclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
