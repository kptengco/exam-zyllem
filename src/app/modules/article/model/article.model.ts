import { EArticleType } from '@modules/article/enum';
import { IArticle, IArticleFeatured, IArticleNormal } from '@modules/article/interface';

export abstract class ArticleModel implements IArticle {
    id: string;
    title: string;
    author: string;
    publishedAt: string | Date; // date time in ISO format
    url: string;
    type: EArticleType;
}

export class FeaturedArticleModel extends ArticleModel implements IArticleFeatured {
    featureImgUrl: string;
}

export class NormalArticleModel extends ArticleModel implements IArticleNormal {
    description: string;
}
