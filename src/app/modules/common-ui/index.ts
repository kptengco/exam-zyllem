import { NgModule } from '@angular/core';

import { BreadcrumbModule } from './breadcrumb';
import { CardModule } from './card';
import { PreloaderModule } from './preloader';
import { TabModule } from './tab';

@NgModule({
    imports: [
        CardModule,
        TabModule,
        PreloaderModule,
        BreadcrumbModule
    ],
    exports: [
        CardModule,
        TabModule,
        PreloaderModule,
        BreadcrumbModule
    ]
})
export class CommonUiModule { }
