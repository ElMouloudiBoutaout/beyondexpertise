import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogData: any;
  blogs: any[] = [];
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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

  searchBlogs(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      const searchResults = this.blogs.filter(blog =>
        blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      // Handle search results (you could emit an event, navigate to search results page, etc.)
      console.log('Search results:', searchResults);
    }
  }
}
