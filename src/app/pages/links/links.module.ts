import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinksPageRoutingModule } from './links-routing.module';

import { LinksPage } from './links.page';
import { HeaderModule } from '../../components/header/header.module';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinksPageRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [LinksPage]
})
export class LinksPageModule {}
