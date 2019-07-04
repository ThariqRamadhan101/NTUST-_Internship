import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProblemPage } from './report-problem.page';

describe('ReportProblemPage', () => {
  let component: ReportProblemPage;
  let fixture: ComponentFixture<ReportProblemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProblemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProblemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
