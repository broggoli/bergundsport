import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgbPage } from './agb.page';
import { HeaderModule } from '../../components/header/header.module';
import { FooterModule } from "../../components/footer/footer.module"

const routes: Routes = [
  {
    path: '',
    component: AgbPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgbPage]
})

export class AgbPageModule {}

