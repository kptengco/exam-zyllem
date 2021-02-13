import {
    Component, ElementRef, OnDestroy,
    OnInit, ViewChild
} from '@angular/core';

import { TabService } from '@modules/common-ui/tab/service';
import { ITab } from '@modules/common-ui/tab/interface';

@Component({
    selector: 'app-tab-component',
    templateUrl: './tab.component.html',
    styleUrls: [
        './tab.component.scss',
        './tab.component.tablet.scss',
        './tab.component.desktop.scss'
    ]
})
export class TabComponent implements OnInit, OnDestroy {

    private tabs: ITab[] = [];

    @ViewChild('tabRef', null) tabNode: ElementRef;

    constructor(
        private readonly tabService: TabService
    ) {
        this.tabs = this.tabService.tabs;
    }

    ngOnInit() {
        this.tabService.update.subscribe(value => {
            if (value) {
                this.tabs = this.tabs.map(tab => {
                    tab.selected = tab.code === value;

                    return tab;
                });
            }
        });
    }

    changeTab(code: string) {
        this.tabService.update.next(code);
    }

    ngOnDestroy(): void {
        this.tabService.destroy();
    }
}
