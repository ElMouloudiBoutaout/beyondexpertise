import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-home-one',
    templateUrl: './home-one.component.html',
    styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.loadAllServices();
        this.loadAccordionItems();
        this.loadProcessData();
        this.loadCommonTexts();
        this.loadFeaturesData();
        this.loadTeamData();
        this.loadClientsData();
        this.loadRecentBlogs();
    }

    private loadAccordionItems(): void {
        this.http.get<{accordionItems: any[]}>('assets/data/courses-items.json')
            .subscribe(data => {
                this.accordionItems = data.accordionItems;
            });
    }

    private loadProcessData(): void {
        this.http.get<any>('assets/data/process-items.json')
            .subscribe(data => {
                this.processData = data.processSection;
            });
    }

    private loadCommonTexts(): void {
        this.http.get<any>('assets/data/common-texts.json')
            .subscribe(data => {
                this.servicesData = data.servicesSection;
            });
    }

    private loadAllServices(): void {
        // Charger les services de consulting
        this.http.get<any>('assets/data/consulting-services.json').subscribe(data => {
            this.consultingServices = data.services;
            this.updateAllServices();
        });

        // Charger les services de formation
        this.http.get<any>('assets/data/formation-services.json').subscribe(data => {
            this.formationServices = data.services;
            this.updateAllServices();
        });

        // Charger les services de développement
        this.http.get<any>('assets/data/development-services.json').subscribe(data => {
            this.developmentServices = data.services;
            this.updateAllServices();
        });
    }

    private updateAllServices(): void {
        this.allServices = [
            ...this.consultingServices,
            ...this.formationServices,
            ...this.developmentServices
        ];
    }

    get currentServices(): any[] {
        switch(this.currentTab) {
            case 'consulting':
                return this.consultingServices;
            case 'formation':
                return this.formationServices;
            case 'development':
                return this.developmentServices;
            default:
                return this.allServices;
        }
    }

    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    teamSlides: OwlOptions = {
		loop: true,
        margin: 20,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    }
    clientWrap: OwlOptions = {
		loop:true,
		margin:30,
		nav:false,
		mouseDrag: true,
		items:1,
		dots: false,
		autoHeight: true,
		autoplay: true,
		smartSpeed: 800,
		autoplayHoverPause: true,
		center: false,
		responsive:{
			0:{
				items:1,
				margin: 10,
			},
			576:{
				items:1,
			},
			768:{
				items:2,
				margin: 20,
			},
			992:{
				items:2,
			},
			1200:{
				items:2,
			}
		}
    }

    // Accordion
    accordionItems: any[] = [];
    selectedItem : any = null;
    toggleAccordionItem(item:any) {
        item.open = !item.open;
        if (this.selectedItem && this.selectedItem !== item) {
            this.selectedItem.open = false;
        }
        this.selectedItem = item;
    }

    // Tabs
    currentTab = 'all';

    currentPage: number = 1;
    itemsPerPage: number = 4;

    get paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.accordionItems.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages() {
        return Math.ceil(this.accordionItems.length / this.itemsPerPage);
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    processData: any;

    consultingServices: any[] = [];
    formationServices: any[] = [];
    developmentServices: any[] = [];
    allServices: any[] = [];

    servicesData: any;

    featuresData: any;

    private loadFeaturesData(): void {
        this.http.get<any>('assets/data/features-section.json')
            .subscribe(data => {
                this.featuresData = data.featuresSection;
            });
    }

    teamData: any;

    private loadTeamData(): void {
        this.http.get<any>('assets/data/team-members.json')
            .subscribe(data => {
                this.teamData = data.teamSection;
            });
    }

    clientsData: any;

    clientSlides: OwlOptions = {
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    };

    private loadClientsData(): void {
        this.http.get<any>('assets/data/clients-section.json')
            .subscribe(data => {
                this.clientsData = data.clientsSection;
            });
    }

    recentBlogs: any[] = [];

    private loadRecentBlogs(): void {
        this.http.get<any>('assets/data/blogs/index.json')
            .subscribe(data => {
                // Get the 3 most recent blogs
                this.recentBlogs = data.blogs.slice(0, 3);
            });
    }

}
