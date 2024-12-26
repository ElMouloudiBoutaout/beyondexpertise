import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFooterData();
  }

  private loadFooterData(): void {
    this.http.get<any>('assets/data/footer.json')
      .subscribe(data => {
        this.footerData = data.footer;
      });
  }
}
