import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-similar-articles',
    templateUrl: './similar-articles.component.html',
    styleUrls: ['./similar-articles.component.scss']
})
export class SimilarArticlesComponent implements OnInit, OnChanges {
    @Input() articleIds: string[] = [];
    similarArticles: any[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['articleIds'] && this.articleIds?.length > 0) {
            this.loadSimilarArticles();
        }
    }

    private loadSimilarArticles(): void {
        this.http.get<any>('assets/data/blogs/index.json').subscribe(data => {
            this.similarArticles = this.articleIds
                .map(id => data.blogs.find((blog: any) => blog.id === id))
                .filter(article => article !== undefined);
        });
    }
}
