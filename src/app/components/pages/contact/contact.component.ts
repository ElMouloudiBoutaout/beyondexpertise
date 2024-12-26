import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadContactData();
  }

  private loadContactData(): void {
    this.http.get<any>('assets/data/contact-section.json')
      .subscribe(data => {
        this.contactData = data.contactSection;
      });
  }
}
