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
    searchTerm: string = '';
    allFormations: any[] = [];
    filteredFormations: any[] = [];
    isSearching: boolean = false;
    allFormationsGlobal: any[] = [];

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.checkScreenSize();
    }

    ngOnInit(): void {
        this.currentTab = 'formations-courtes';
        this.loadAllFormations();
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

        let filename: string;
        switch(tabId) {
            case 'formation_courte':
                filename = 'formations-courtes';
                break;
            case 'formation_longue':
                filename = 'formations-longues';
                break;
            case 'formation_certifiante':
                filename = 'formation_certifiante';
                break;
            default:
                filename = 'formations-courtes';
        }

        this.http.get<any>(`assets/data/formations/${filename}.json`).subscribe(data => {
            this.allFormations = data.formations;
            this.filteredFormations = [...this.allFormations];
            this.currentFormations = [...this.allFormations];
            this.applySearch();
        });
    }

    loadAllFormations() {
        this.isLoading = true;
        // Load all formation types
        Promise.all([
            this.http.get<any>('assets/data/formations/formations-courtes.json').toPromise(),
            this.http.get<any>('assets/data/formations/formations-longues.json').toPromise(),
            this.http.get<any>('assets/data/formations/formation_certifiante.json').toPromise()
        ]).then(([courtes, longues, certifiantes]) => {
            this.allFormationsGlobal = [
                ...courtes.formations,
                ...longues.formations,
                ...certifiantes.formations
            ];
            // Load initial tab
            this.loadFormations();
            this.isLoading = false;
        });
    }

    loadFormations() {
        this.isLoading = true;
        this.http.get<any>('assets/data/formations/formations-courtes.json').subscribe(data => {
            this.allFormations = data.formations;
            this.filteredFormations = [...this.allFormations];
            this.currentFormations = [...this.allFormations];
            this.isLoading = false;
        });
    }

    onSearch() {
        if (!this.searchTerm.trim()) {
            this.isSearching = false;
            this.loadFormations(); // Reset to current tab view
            return;
        }

        this.isSearching = true;
        const searchTermLower = this.searchTerm.toLowerCase().trim();
        this.filteredFormations = this.allFormationsGlobal.filter(formation =>
            formation.title.toLowerCase().includes(searchTermLower) ||
            formation.description.toLowerCase().includes(searchTermLower)
        );
        this.currentFormations = [...this.filteredFormations];
    }

    private applySearch() {
        if (!this.searchTerm.trim()) {
            this.filteredFormations = [...this.allFormations];
            this.currentFormations = [...this.allFormations];
            return;
        }

        const searchTermLower = this.searchTerm.toLowerCase().trim();
        this.filteredFormations = this.allFormations.filter(formation =>
            formation.title.toLowerCase().includes(searchTermLower) ||
            formation.description.toLowerCase().includes(searchTermLower)
        );
        this.currentFormations = [...this.filteredFormations];
    }
}
