import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { KontaktPage } from "./kontakt.page";
import { HeaderModule } from '../../components/header/header.module';
import { FooterModule } from '../../components/footer/footer.module';

const routes: Routes = [
  {
    path: "",
    component: KontaktPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KontaktPage]
})
export class KontaktPageModule {}
