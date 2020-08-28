import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BergfuererTarifePage } from './bergfuerer-tarife.page';

const routes: Routes = [
  {
    path: '',
    component: BergfuererTarifePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BergfuererTarifePageRoutingModule {}
