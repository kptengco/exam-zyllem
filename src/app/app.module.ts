import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ArticleModule, ArticleRouter, PageModule } from '@modules/index';

import { FooterComponent, HeaderComponent } from '@app/components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    PageModule,
    ArticleModule.forRoot('api/services/article'),
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/article'
        },
        {
          path: '',
          component: HeaderComponent,
          outlet: 'header'
        },
        {
          path: '',
          component: FooterComponent,
          outlet: 'footer'
        },
        {
          path: 'article',
          component: AppComponent,
          children: [
            ...ArticleRouter
          ]
        },
        {
          path: '**',
          redirectTo: '/404',
          pathMatch: 'full'
        }
      ],
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
