import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BergfuererTarifePageRoutingModule } from './bergfuerer-tarife-routing.module';

import { BergfuererTarifePage } from './bergfuerer-tarife.page';
import { HeaderModule } from '../../components/header/header.module';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BergfuererTarifePageRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [BergfuererTarifePage]
})
export class BergfuererTarifePageModule {}
