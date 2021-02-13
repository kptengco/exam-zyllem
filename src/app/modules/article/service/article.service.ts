import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, flatMap, map } from 'rxjs/operators';

import { ArticleModel, FeaturedArticleModel } from '@modules/article/model';
import { EArticleType } from '@modules/article/enum';
import { API_BASE_URL } from '@modules/article/token';

export class ArticleService {

    private articles: { [key: string]: ArticleModel } = {};

    constructor(
        @Inject(API_BASE_URL) private readonly apiUrl: string,
        private readonly httpClient: HttpClient
    ) { }

    getArticles(): Observable<ArticleModel[]> {
        return this.httpClient.get(`${this.apiUrl}/v1/3d0d5062`)
            .pipe(
                map((articles: ArticleModel[]) => this.articleMapper(articles)),
                catchError(() => {
                    return this.httpClient.get('assets/mock/articles.json')
                        .pipe(
                            map((articles: ArticleModel[]) => this.articleMapper(articles))
                        );
                })
            );
    }

    getArticle(key: string): Observable<ArticleModel> {
        if (key in this.articles) {
            return of(this.articles[key]);
        }

        return this.getArticles()
            .pipe(
                flatMap(article => article),
                filter(article => article.id === key)
            );
    }

    articleMapper(articles: ArticleModel[]): ArticleModel[] {
        let imageCounter = 1;

        return articles.map(article => {
            if (imageCounter === 5) {
                imageCounter = 1;
            }

            article.publishedAt = new Date(article.publishedAt);

            if (article.type === EArticleType.FEATURED) {
                (article as FeaturedArticleModel).featureImgUrl = `https://picsum.photos/500/300?cacheId=${imageCounter}`;
            }

            this.articles[article.id] = article;

            imageCounter++;

            return article;
        }).sort((a, b) => {
            const aFeatured = a.type === EArticleType.FEATURED;
            const bFeatured = b.type === EArticleType.FEATURED;

            // @readme ----- sort by featured type first
            if (aFeatured && !bFeatured) {
                return -1;
            }

            if (bFeatured && !aFeatured) {
                return 1;
            }
            // @readme sort by featured type first -----

            // @readme sort by time
            return (b.publishedAt as Date).getTime() - (a.publishedAt as Date).getTime();
        });
    }
}
