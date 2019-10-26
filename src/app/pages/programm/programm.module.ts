import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ProgrammPage } from "./programm.page";
import { VeranstaltungComponent } from "./veranstaltung/veranstaltung.component";
import { VeranstaltungDetailComponent } from "./veranstaltung/veranstaltung-detail/veranstaltung-detail.component";
import { AnmeldungPage } from "./anmeldung/anmeldung.page";
import { ControlMessages } from "./anmeldung/forms/conrol-messages/conrol-messages.component";

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
    IonicModule,
    RouterModule.forChild(routes)
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
