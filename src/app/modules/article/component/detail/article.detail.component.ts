import {
    AfterViewInit, Component, OnDestroy,
    OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { BreadcrumbService } from '@modules/common-ui/breadcrumb/service';

import { ArticleModel } from '@modules/article/model';
import { ArticleService } from '@modules/article/service';

@Component({
    selector: 'app-article-detail-component',
    templateUrl: './article.detail.component.html',
    styleUrls: [
        './article.detail.component.scss'
    ],
    viewProviders: [
        BreadcrumbService
    ]
})
export class ArticleDetailComponent implements OnInit, AfterViewInit, OnDestroy {

    article: ArticleModel = {} as ArticleModel;
    loading: boolean;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly articleService: ArticleService,
        private readonly breadcrumbService: BreadcrumbService
    ) { }

    ngOnInit() {
        this.breadcrumbService.addItem({
            label: 'Articles',
            link: ''
        });

        this.loading = true;

        const subscription = this.articleService.getArticle(this.activatedRoute.snapshot.params.id)
            .pipe(
                finalize(() => {
                    this.loading = false;

                    if (!this.article.id) {
                        this.router.navigate(['404']);
                    }

                    subscription.unsubscribe();
                })
            )
            .subscribe(
                article => {
                    this.article = article;

                    this.breadcrumbService.addItem({
                        label: this.article.title
                    });
                },
                () => {
                    this.router.navigate(['503']);
                }
            );
    }

    ngAfterViewInit(): void {
        this.breadcrumbService.redirect.subscribe(link => {
            if (link !== undefined) {
                this.router.navigate([link]);
            }
        });
    }

    ngOnDestroy(): void {
        this.breadcrumbService.destroy();
    }
}
