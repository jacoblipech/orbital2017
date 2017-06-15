import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplatePage } from './template';

@NgModule({
  declarations: [
    TemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(TemplatePage),
  ],
  exports: [
    TemplatePage
  ]
})
export class TemplatePageModule {}
