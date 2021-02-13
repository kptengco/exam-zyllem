import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CommonUiModule } from '@modules/common-ui';

import { ArticleComponent, ArticleDetailComponent } from './component';
import { ArticleService } from './service';
import { API_BASE_URL } from './token';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule {

  static forRoot(apiUrl: string) {
    return {
      ngModule: ArticleModule,
      providers: [
        {
          provide: API_BASE_URL,
          useValue: apiUrl
        }
      ]
    };
  }
}

export * from './article.router';
