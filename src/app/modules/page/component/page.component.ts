import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-page-component',
    templateUrl: './page.component.html',
    styleUrls: [
        './page.component.scss'
    ]
})
export class PageComponent implements OnInit {

    pageType: 503 | 404 = 404;

    constructor(
        private readonly route: ActivatedRoute
    ) { }

    get pageNotFound() {
        return this.pageType === 404;
    }

    get pageError() {
        return this.pageType === 503;
    }

    ngOnInit() {
        const subscription = this.route.data.subscribe(page => {
            this.pageType = page.type;
            subscription.unsubscribe();
        });
    }
}
