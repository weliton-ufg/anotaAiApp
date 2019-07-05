import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecucaoPage } from './execucao.page';

describe('ExecucaoPage', () => {
  let component: ExecucaoPage;
  let fixture: ComponentFixture<ExecucaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecucaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecucaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
