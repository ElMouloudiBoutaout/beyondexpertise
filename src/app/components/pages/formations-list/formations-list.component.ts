import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-formations-list',
    templateUrl: './formations-list.component.html',
    styleUrls: ['./formations-list.component.scss']
})
export class FormationsListComponent implements OnInit, OnDestroy {
    servicesData: any = {
        title: "Nos formations",
        subtitle: "Développez vos compétences",
        description: "Découvrez nos formations adaptées à vos besoins",
        tabs: [
            {
                id: "formation_courte",
                label: "Formations Courtes"
            },
            {
                id: "formation_certifiante",
                label: "Formations Certifiantes"
            },
            {
                id: "formation_longue",
                label: "Formations Longues"
            }
        ]
    };
    currentTab: string = 'formations-courtes';
    currentFormations: any[] = [];
    isLoading: boolean = true;
    isMobile: boolean = false;

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.checkScreenSize();
    }

    ngOnInit(): void {
        this.loadFormations(this.currentTab);
        this.route.queryParams.subscribe(params => {
            if (params['type']) {
                this.currentTab = params['type'];
                this.switchTab(new Event('click'), params['type']);
            }
        });
        window.addEventListener('resize', this.checkScreenSize.bind(this));
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.checkScreenSize.bind(this));
    }

    private checkScreenSize(): void {
        this.isMobile = window.innerWidth <= 768;
    }

    switchTab(event: Event, tabId: string): void {
        event.preventDefault();
        this.currentTab = tabId;
        this.loadFormations(tabId);
    }

    private loadFormations(tabId: string): void {
        this.isLoading = true;
        let filename: string;

        switch(tabId) {
            case 'formation_longue':
                filename = 'formations-longues';
                break;
            case 'formation_courte':
                filename = 'formations-courtes';
                break;
            default:
                filename = 'formation_certifiante';
        }

        console.log('Loading formations from:', filename);
        this.http.get<any>(`assets/data/formations/${filename}.json`)
            .subscribe(
                data => {
                    console.log('Loaded formations:', data);
                    this.currentFormations = data.formations;
                    this.isLoading = false;
                },
                error => {
                    console.error('Error loading formations:', error);
                    this.isLoading = false;
                    this.currentFormations = [];
                }
            );
    }
}
