import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktPage } from './kontakt.page';

describe('KontaktPage', () => {
  let component: KontaktPage;
  let fixture: ComponentFixture<KontaktPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontaktPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontaktPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
