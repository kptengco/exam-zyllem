import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabComponent } from './component';
import { TabService } from './service';

@NgModule({
    declarations: [
        TabComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        TabService,
        {
            provide: 'TABS',
            useValue: []
        }
    ],
    exports: [
        TabComponent
    ]
})
export class TabModule { }
