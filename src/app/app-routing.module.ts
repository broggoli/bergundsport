import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./pages/home/home.module").then(m => m.HomePageModule)
        //loadChildren: "../home/home.module#HomePageModule"
      },
      {
        path: "",
        loadChildren: () =>
          import("./pages/home/home.module").then(m => m.HomePageModule)
        //loadChildren: "../home/home.module#HomePageModule"
      },
      {
        path: "kontakt",
        loadChildren: () =>
          import("./pages/kontakt/kontakt.module").then(m => m.KontaktPageModule)
        //loadChildren: "../kontakt/kontakt.module#KontaktPageModule"
      },
      {
        path: "programm",
        loadChildren: () =>
          import("./pages/programm/programm.module").then(m => m.ProgrammPageModule)
        //loadChildren: "../programm/programm.module#ProgrammPageModule"
      },{
        path: "agb",
        loadChildren: () =>
          import("./pages/agb/agb.module").then(m => m.AgbPageModule)
        //loadChildren: "../programm/programm.module#ProgrammPageModule"
      },{
        path: "wissenswertes/bergfuehrerTarife",
        loadChildren: () =>
          import("./pages/bergfuerer-tarife/bergfuerer-tarife.module").then(m => m.BergfuererTarifePageModule)
        //loadChildren: "../programm/programm.module#ProgrammPageModule"
      },{
        path: "wissenswertes/links",
        loadChildren: () =>
          import("./pages/links/links.module").then(m => m.LinksPageModule)
        //loadChildren: "../programm/programm.module#ProgrammPageModule"
      } /*,
      {
        path: "material",
        loadChildren: "../material/material.module#MaterialPageModule"
      }*/
    ]
  }
  //{ path: 'agb', loadChildren: './pages/agb/agb.module#AgbPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
