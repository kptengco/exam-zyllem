import { Routes } from '@angular/router';

import { ArticleComponent, ArticleDetailComponent } from './component';

export const ArticleRouter: Routes = [
    {
        path: '',
        component: ArticleComponent
    },
    {
        path: ':id',
        component: ArticleDetailComponent
    }
];
