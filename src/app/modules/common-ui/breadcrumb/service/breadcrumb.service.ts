import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IBreadcrumbItem } from '@modules/common-ui/breadcrumb/interface';

@Injectable()
export class BreadcrumbService {

    private breadcrumbItems: IBreadcrumbItem[] = [];

    redirect: Subject<string> = new Subject();

    constructor(
        @Inject('SEPARATOR') readonly separator: string
    ) { }

    addItem(item: IBreadcrumbItem) {
        this.breadcrumbItems.push(item);
    }

    get items() {
        return this.breadcrumbItems;
    }

    destroy() {
        this.redirect.unsubscribe();
    }
}
