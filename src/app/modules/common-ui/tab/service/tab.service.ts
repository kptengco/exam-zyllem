import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ITab } from '@modules/common-ui/tab/interface';


@Injectable()
export class TabService {

    readonly update: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(
        @Inject('TABS') readonly tabs: ITab[]
    ) { }

    destroy() {
        this.update.unsubscribe();
    }
}
