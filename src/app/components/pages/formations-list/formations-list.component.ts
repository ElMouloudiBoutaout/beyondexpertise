import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-formations-list',
    templateUrl: './formations-list.component.html',
    styleUrls: ['./formations-list.component.scss']
})
export class FormationsListComponent implements OnInit {
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
    currentTab: string = 'formation_courte';
    currentFormations: any[] = [];
    isLoading: boolean = false;

    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadFormations(this.currentTab);
        this.route.queryParams.subscribe(params => {
            if (params['type']) {
                this.currentTab = params['type'];
                this.switchTab(new Event('click'), params['type']);
            }
        });
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
