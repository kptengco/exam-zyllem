import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { TabService } from '@modules/common-ui/tab/service';
import { BreadcrumbService } from '@modules/common-ui/breadcrumb/service';

import { ArticleModel, FeaturedArticleModel, NormalArticleModel } from '@modules/article/model';
import { ArticleService } from '@modules/article/service';
import { EArticleType } from '@modules/article/enum';

type tabCode = 'ALL' | 'FEATURED' | 'NORMAL';

@Component({
    selector: 'app-article-component',
    templateUrl: './article.component.html',
    viewProviders: [
        BreadcrumbService,
        TabService,
        {
            provide: 'TABS',
            useValue: [
                {
                    code: 'ALL',
                    label: 'All',
                    selected: true
                },
                {
                    code: 'FEATURED',
                    label: 'Featured',
                    selected: false
                },
                {
                    code: 'NORMAL',
                    label: 'Normal',
                    selected: false
                }
            ]
        }
    ],
    styleUrls: [
        './article.component.scss',
        './article.component.tablet.scss',
        './article.component.desktop.scss'
    ]
})
export class ArticleComponent implements OnInit, OnDestroy {

    articles: ArticleModel[] = [];
    currentTab: tabCode;
    loading: boolean;

    constructor(
        private readonly articleService: ArticleService,
        private readonly tabService: TabService,
        private readonly breadcrumbService: BreadcrumbService
    ) { }

    ngOnInit() {
        this.loading = true;

        this.breadcrumbService.addItem({
            label: 'Articles'
        });

        this.tabService.update.subscribe((code: tabCode) => {
            if (!code) {
                const tab = this.tabService.tabs.find(item => item.selected);
                this.currentTab = tab.code as tabCode;
            } else {
                this.currentTab = code;
            }
        });

        const subscription = this.articleService.getArticles()
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe(articles => {
                this.articles = articles;
                subscription.unsubscribe();
            });
    }

    filterArticle(articles: ArticleModel[]) {
        if (this.currentTab === 'ALL') {
            return articles;
        }

        return articles.filter(article => article.type === this.currentTab);
    }

    isFeatured(type: string) {
        return type === EArticleType.FEATURED;
    }

    cardInput(article: ArticleModel) {
        return {
            image: (article as FeaturedArticleModel).featureImgUrl,
            title: article.title,
            description: (article as NormalArticleModel).description
        };
    }

    ngOnDestroy(): void {
        this.tabService.destroy();
    }
}
