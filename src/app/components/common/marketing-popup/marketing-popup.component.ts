import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-marketing-popup',
    templateUrl: './marketing-popup.component.html',
    styleUrls: ['./marketing-popup.component.scss']
})
export class MarketingPopupComponent implements OnInit {
    showPopup: boolean = false;
    popupData: any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.loadPopupData();
        // Show popup after 3 seconds
        setTimeout(() => {
            if (!this.hasSeenPopup()) {
                this.showPopup = true;
            }
        }, 3000);
    }

    private loadPopupData() {
        this.http.get<any>('assets/data/marketing-popup.json').subscribe(
            data => {
                this.popupData = data;
            }
        );
    }

    closePopup() {
        this.showPopup = false;
        this.setPopupSeen();
    }

    navigateToFormation() {
        this.closePopup();
        this.router.navigate(['/formation', this.popupData.formationId]);
    }

    private hasSeenPopup(): boolean {
        return localStorage.getItem('popupSeen') === 'true';
    }

    private setPopupSeen() {
        localStorage.setItem('popupSeen', 'true');
        // Reset after 24 hours
        setTimeout(() => {
            localStorage.removeItem('popupSeen');
        }, 24 * 60 * 60 * 1000);
    }
}
