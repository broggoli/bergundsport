import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BergfuererTarifePage } from './bergfuerer-tarife.page';

describe('BergfuererTarifePage', () => {
  let component: BergfuererTarifePage;
  let fixture: ComponentFixture<BergfuererTarifePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BergfuererTarifePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BergfuererTarifePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
