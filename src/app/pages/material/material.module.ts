import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MaterialPage } from "./material.page";
import { MaterialItemComponent } from "./material-item/material-item.component";

const routes: Routes = [
  {
    path: "",
    component: MaterialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MaterialPage, MaterialItemComponent]
})
export class MaterialPageModule {}
