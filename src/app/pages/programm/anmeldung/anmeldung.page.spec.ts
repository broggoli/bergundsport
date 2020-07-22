import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmeldungPage } from './anmeldung.page';

describe('AnmeldungPage', () => {
  let component: AnmeldungPage;
  let fixture: ComponentFixture<AnmeldungPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnmeldungPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnmeldungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
