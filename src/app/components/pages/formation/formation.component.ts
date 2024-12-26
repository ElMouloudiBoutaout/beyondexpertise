import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
    styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
    formationData: any;
    activeSection: string = 'target';

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.loadFormationData();
    }

    private loadFormationData(): void {
        const formationId = this.route.snapshot.params['id'] || 'deep-learning';
        this.http.get<any>(`assets/data/formations/${formationId}.json`)
            .subscribe(data => {
                this.formationData = data.formation;
            });
    }

    scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            this.activeSection = sectionId;
        }
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        const sections = ['target', 'prerequisites', 'objectives', 'program'];
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const top = element.offsetTop - 100;
                const bottom = top + element.offsetHeight;

                if (scrollPosition >= top && scrollPosition < bottom) {
                    this.activeSection = section;
                    break;
                }
            }
        }
    }
}
