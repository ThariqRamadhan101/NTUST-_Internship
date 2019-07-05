import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataPage } from './form-data.page';

describe('FormDataPage', () => {
  let component: FormDataPage;
  let fixture: ComponentFixture<FormDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
