import { Component, OnDestroy, OnInit } from '@angular/core';

import { BreadcrumbService } from '@modules/common-ui/breadcrumb/service';
import { IBreadcrumbItem } from '@modules/common-ui/breadcrumb/interface';

@Component({
    selector: 'app-breadcrumb-component',
    templateUrl: './breadcrumb.component.html',
    styleUrls: [
        './breadcrumb.component.scss'
    ]
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

    items: IBreadcrumbItem[] = [];
    separator: string;

    constructor(
        private readonly breadcrumbService: BreadcrumbService
    ) {}

    ngOnInit() {
        this.separator = this.breadcrumbService.separator;
        this.items = this.breadcrumbService.items;
    }

    hasRedirector(item: IBreadcrumbItem) {
        return 'link' in item;
    }

    onRedirect(link: string) {
        this.breadcrumbService.redirect.next(link);
    }

    ngOnDestroy(): void {
        this.breadcrumbService.destroy();
    }
}
