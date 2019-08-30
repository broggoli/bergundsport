import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeranstaltungComponent } from './veranstaltung.component';

describe('VeranstaltungComponent', () => {
  let component: VeranstaltungComponent;
  let fixture: ComponentFixture<VeranstaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeranstaltungComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeranstaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
