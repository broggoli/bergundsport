import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ProgrammPage } from "./programm.page";
import { VeranstaltungComponent } from "./veranstaltung/veranstaltung.component";
import { VeranstaltungDetailComponent } from "./veranstaltung/veranstaltung-detail/veranstaltung-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ProgrammPage
  },
  {
    path: ":id",
    component: VeranstaltungDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProgrammPage,
    VeranstaltungComponent,
    VeranstaltungDetailComponent
  ]
})
export class ProgrammPageModule {}
