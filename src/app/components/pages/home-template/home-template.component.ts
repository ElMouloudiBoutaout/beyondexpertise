import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';

@Component({
    selector: 'app-home-template',
    templateUrl: './home-template.component.html',
    styleUrls: ['./home-template.component.scss']
})
export class HomeTemplateComponent implements OnInit {
    servicesData: any;
    processData: any;
    teamData: any;
    clientsData: any;
    contactData: any;
    featuresData: any;
    accordionItems: any[] = [];
    formData: any = {
        name: '',
        email: '',
        phone_number: '',
        message: '',
        msg_subject: ''
    };
    isSubmitting: boolean = false;
    shouldEnableTeamCarousel: boolean = false;

    // Carousel Options
    teamSlides: OwlOptions = {
        loop: false,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        margin: 20,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 2 },
            992: { items: 3 },
            1200: { items: 4 }
        }
    };

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

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private emailService: EmailService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const formationName = params['formationName'];
            this.loadPageData(formationName);
        });
    }

    private loadPageData(formationName: string) {
        // Load all data sections from formation-specific files
        this.http.get<any>(`assets/data/landing/${formationName}/banner.json`)
            .subscribe(data => this.servicesData = data);

        this.http.get<any>(`assets/data/landing/${formationName}/process.json`)
            .subscribe(data => this.processData = data);

        this.http.get<any>(`assets/data/landing/${formationName}/team.json`)
            .subscribe(data => {
                this.teamData = data;
                this.shouldEnableTeamCarousel = data.members?.length >= 4;
                if (this.shouldEnableTeamCarousel) {
                    this.teamSlides = {
                        ...this.teamSlides,
                        loop: true
                    };
                }
            });

        this.http.get<any>(`assets/data/landing/${formationName}/clients.json`)
            .subscribe(data => this.clientsData = data);

        this.http.get<any>(`assets/data/landing/${formationName}/contact.json`)
            .subscribe(data => this.contactData = data);

        this.http.get<any>(`assets/data/landing/${formationName}/features.json`)
            .subscribe(data => this.featuresData = data);

        this.http.get<any>(`assets/data/landing/${formationName}/formation-details.json`)
            .subscribe(data => {
                this.accordionItems = data.items.map((item: any) => ({
                    ...item,
                    open: false,
                    contentList: Array.isArray(item.content) ? item.content : [],
                    contentSections: !Array.isArray(item.content) ? item.content : null
                }));
            });
    }

    toggleAccordionItem(item: any) {
        item.open = !item.open;
    }

    async onSubmit(event: Event) {
        event.preventDefault();

        if (this.isSubmitting) return;

        this.isSubmitting = true;

        try {
            const emailData = {
                ...this.formData,
                msg_subject: `${this.servicesData?.title} - ${this.formData.msg_subject}`
            };

            await this.emailService.sendEmail(emailData);
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

    toggleModule(module: any) {
        module.open = !module.open;
    }
}
