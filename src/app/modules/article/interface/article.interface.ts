import { EArticleType } from '@modules/article/enum';

export interface IArticle {
    id: string;
    title: string;
    author: string;
    publishedAt: string | Date; // date time in ISO format
    url: string;
    type: EArticleType;
}

export interface IArticleFeatured extends IArticle {
    featureImgUrl: string;
}

export interface IArticleNormal extends IArticle {
    description: string;
}
