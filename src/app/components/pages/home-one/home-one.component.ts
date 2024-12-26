import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EmailService } from 'src/app/services/email.service';

@Component({
    selector: 'app-home-one',
    templateUrl: './home-one.component.html',
    styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit {

    // Add form properties
    formData = {
        name: '',
        email: '',
        phone_number: '',
        msg_subject: '',
        message: ''
    };
    isSubmitting = false;

    constructor(
        private http: HttpClient,
        private viewportScroller: ViewportScroller,
        private emailService: EmailService
    ) { }

    ngOnInit(): void {
        this.loadAllServices();
        this.loadAccordionItems();
        this.loadProcessData();
        this.loadCommonTexts();
        this.loadFeaturesData();
        this.loadTeamData();
        this.loadClientsData();
        this.loadRecentBlogs();
        this.loadContactData();
    }

    private loadAccordionItems(): void {
        this.http.get<any>('assets/data/formations/formations-index.json')
            .subscribe(data => {
                // Transform the services array into accordion items
                this.accordionItems = data.services.map(service => ({
                    title: service.title,
                    content: service.description,
                    open: false // All items closed by default
                }));
            });
    }

    private loadProcessData(): void {
        this.http.get<any>('assets/data/process-items.json')
            .subscribe(data => {
                this.processData = data.processSection;
            });
    }

    private loadCommonTexts(): void {
        this.http.get<any>('assets/data/common-services-texts.json')
            .subscribe(data => {
                this.servicesData = data.servicesSection;
            });
    }

    private loadAllServices(): void {
        // Charger les services de consulting
        this.http.get<any>('assets/data/consulting/consulting-index.json').subscribe(data => {
            this.consultingServices = data.services;
            this.updateAllServices();
        });

        // Charger les services de formation
        this.http.get<any>('assets/data/formations/formations-index.json').subscribe(data => {
            this.formationServices = data.services;
            this.updateAllServices();
        });

        // Charger les services de développement
        this.http.get<any>('assets/data/development/development-index.json').subscribe(data => {
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
    toggleAccordionItem(item: any) {
        // Close previously opened item
        if (this.selectedItem && this.selectedItem !== item) {
            this.selectedItem.open = false;
        }

        // Toggle current item
        item.open = !item.open;
        this.selectedItem = item.open ? item : null;
    }

    // Tabs
    currentTab = 'all';

    currentPage: number = 1;
    itemsPerPage: number = 3;

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

    contactData: any;

    private loadContactData(): void {
        this.http.get<any>('assets/data/contact-section.json')
            .subscribe(data => {
                this.contactData = data.contactSection;
            });
    }

    scrollToServiceTab(tabId: string): void {
        // First scroll to services section
        this.viewportScroller.scrollToAnchor('services');

        // Then switch to the corresponding tab
        setTimeout(() => {
            this.currentTab = tabId;
        }, 100);
    }

    getServiceRoute(service: any): string {
        switch(this.currentTab) {
            case 'consulting':
                return `/consulting/${service.id}`;
            case 'formation':
                return `/formation/${service.id}`;
            case 'development':
                return `/development/${service.id}`;
            default:
                return service.link || '/';
        }
    }

    // Add submit method
    async onSubmit(event: Event) {
        event.preventDefault();

        if (this.isSubmitting) return;

        this.isSubmitting = true;

        try {
            await this.emailService.sendEmail(this.formData);
            alert('Message envoyé avec succès!');
            // Reset form
            this.formData = {
                name: '',
                email: '',
                phone_number: '',
                msg_subject: '',
                message: ''
            };
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
        } finally {
            this.isSubmitting = false;
        }
    }

}
