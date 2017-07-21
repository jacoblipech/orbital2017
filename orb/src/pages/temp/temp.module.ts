import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TempPage } from './temp';

@NgModule({
  declarations: [
    TempPage,
  ],
  imports: [
    IonicPageModule.forChild(TempPage),
  ],
  exports: [
    TempPage
  ]
})
export class TempPageModule {}
