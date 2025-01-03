import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyContactComponent } from '../common/sticky-contact/sticky-contact.component';
import { DevelopmentComponent } from './development.component';

@NgModule({
  declarations: [
    DevelopmentComponent,
    StickyContactComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DevelopmentComponent,
    StickyContactComponent
  ]
})
export class DevelopmentModule { }
