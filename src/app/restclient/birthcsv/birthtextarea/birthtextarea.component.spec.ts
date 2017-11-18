import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthtextareaComponent } from './birthtextarea.component';

describe('BirthtextareaComponent', () => {
  let component: BirthtextareaComponent;
  let fixture: ComponentFixture<BirthtextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthtextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthtextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
