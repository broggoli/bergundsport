import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";

const routes: Routes = [
  {
    path: "menu",
    component: MenuPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then(m => m.HomePageModule)
        //loadChildren: "../home/home.module#HomePageModule"
      },
      {
        path: "kontakt",
        loadChildren: () =>
          import("../kontakt/kontakt.module").then(m => m.KontaktPageModule)
        //loadChildren: "../kontakt/kontakt.module#KontaktPageModule"
      },
      {
        path: "programm",
        loadChildren: () =>
          import("../programm/programm.module").then(m => m.ProgrammPageModule)
        //loadChildren: "../programm/programm.module#ProgrammPageModule"
      },{
        path: "agb",
        loadChildren: () =>
          import("../agb/agb.module").then(m => m.AgbPageModule)
        //loadChildren: "../programm/programm.module#ProgrammPageModule"
      } /*,
      {
        path: "material",
        loadChildren: "../material/material.module#MaterialPageModule"
      }*/
    ]
  },
  {
    path: "",
    redirectTo: "/menu/home"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
