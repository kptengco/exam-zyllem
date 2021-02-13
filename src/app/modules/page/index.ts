import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageComponent } from './component';
import { PageRouter } from './page.router';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      ...PageRouter
    ])
  ]
})
export class PageModule { }
