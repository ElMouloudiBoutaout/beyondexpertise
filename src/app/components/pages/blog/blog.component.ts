import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  private loadBlogs(): void {
    this.http.get<any>('assets/data/blogs/index.json')
      .subscribe(data => {
        this.blogs = data.blogs;
      });
  }

  get paginatedBlogs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.blogs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.blogs.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
