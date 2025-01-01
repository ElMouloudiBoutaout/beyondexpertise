import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];

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
}
