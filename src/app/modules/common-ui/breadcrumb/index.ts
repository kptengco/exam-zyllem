import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbComponent } from './component';
import { BreadcrumbService } from './service';

@NgModule({
    declarations: [
        BreadcrumbComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BreadcrumbComponent
    ],
    providers: [
        BreadcrumbService,
        {
            provide: 'SEPARATOR',
            useValue: '/'
        }
    ]
})
export class BreadcrumbModule { }
