import { Routes } from '@angular/router';

import { PageComponent } from './component';

export const PageRouter: Routes = [
    {
        path: '404',
        component: PageComponent,
        data: {
            type: 404
        }
    },
    {
        path: '503',
        component: PageComponent,
        data: {
            type: 503
        }
    }
];
