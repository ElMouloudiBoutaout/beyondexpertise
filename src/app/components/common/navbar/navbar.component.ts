import { Location, LocationStrategy, PathLocationStrategy, ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class NavbarComponent implements OnInit {

    location: any;
    navbarClass: any;

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    constructor(
        private router: Router,
        location: Location,
        private viewportScroller: ViewportScroller
    ) {
        this.router.events
        .subscribe((event) => {
            if ( event instanceof NavigationEnd ) {
                this.location = this.router.url;
                if (this.location == '/home-three'){
                    this.navbarClass = 'navbar-area three';
                } else {
                    this.navbarClass = 'navbar-area';
                }

                // Handle fragment navigation
                const fragment = this.router.parseUrl(this.router.url).fragment;
                if (fragment) {
                    setTimeout(() => {
                        this.viewportScroller.scrollToAnchor(fragment);
                    }, 100);
                }
            }
        });
    }

    ngOnInit(): void {}

    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Method to handle navigation when already on home page
    scrollToSection(sectionId: string): void {
        if (this.router.url === '/') {
            this.viewportScroller.scrollToAnchor(sectionId);
        } else {
            this.router.navigate(['/'], { fragment: sectionId });
        }
    }

}
