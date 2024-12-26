import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogData: any;
  blogs: any[] = [];
  private _searchQuery: string = '';
  searchResults: any[] = [];
  showSearchResults: boolean = false;
  private searchSubject = new Subject<string>();

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    this._searchQuery = value;
    this.searchSubject.next(value);
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300) // Wait 300ms after last input before searching
    ).subscribe(() => {
      this.performSearch();
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  private loadBlogs(): void {
    this.http.get<any>('assets/data/blogs/index.json').subscribe(data => {
      this.blogs = data.blogs;
      this.route.params.subscribe(params => {
        const blogId = params['id'];
        const blog = this.blogs.find(b => b.id === blogId);
        if (blog) {
          this.loadBlogDetails(blogId, blog);
        } else {
          this.router.navigate(['/blog']);
        }
      });
    });
  }

  private loadBlogDetails(blogId: string, currentBlog: any): void {
    this.http.get<any>(`assets/data/blogs/${blogId}.json`).subscribe(data => {
      this.blogData = data.blogDetails;
    });
  }

  searchBlogs(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private performSearch(): void {
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      this.searchResults = this.blogs.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query)
      );
      this.showSearchResults = true;
    } else {
      this.searchResults = [];
      this.showSearchResults = false;
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.showSearchResults = false;
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }
}
