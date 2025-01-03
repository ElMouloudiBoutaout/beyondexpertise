import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-development',
    templateUrl: './development.component.html',
    styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent {
    isOpen: boolean = false;

    constructor(private router: Router) {}

    openPopup() {
        this.isOpen = true;
    }

    closePopup() {
        this.isOpen = false;
    }

    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    }

    navigateToContact() {
        this.router.navigate(['/'], { fragment: 'contact' }).then(() => {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}
