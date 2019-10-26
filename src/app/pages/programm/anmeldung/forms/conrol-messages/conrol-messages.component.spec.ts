import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ControlMessages } from "./conrol-messages.component";

describe("ConrolMessages", () => {
  let component: ControlMessages;
  let fixture: ComponentFixture<ControlMessages>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlMessages],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
