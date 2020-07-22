import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ProgrammPage } from "./programm.page";
import { VeranstaltungComponent } from "../../components/veranstaltung/veranstaltung.component";
import { VeranstaltungDetailComponent } from "../../components/veranstaltung-detail/veranstaltung-detail.component";
import { AnmeldungPage } from "./anmeldung/anmeldung.page";
import { ControlMessages } from "../../components/conrol-messages/conrol-messages.component";

import { HeaderModule } from '../../components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
const routes: Routes = [
  {
    path: "",
    component: ProgrammPage
  },
  {
    path: ":id",
    component: VeranstaltungDetailComponent
  },
  {
    path: ":id/anmeldung",
    component: AnmeldungPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot({ baseUrl: 'http://bergundsport.ch/new/' }),
    IonicModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
    NgxGalleryModule,
  ],
  declarations: [
    ProgrammPage,
    VeranstaltungComponent,
    VeranstaltungDetailComponent,
    AnmeldungPage,
    ControlMessages
  ]
})
export class ProgrammPageModule {}
