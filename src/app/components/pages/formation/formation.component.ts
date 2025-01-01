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
    activeSection: string = 'section-target';

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.loadFormationData();
    }

    private loadFormationData(): void {
        const formationId = this.route.snapshot.params['id'];
        if (formationId) {
            this.http.get<any>(`assets/data/formations/${formationId}.json`)
                .subscribe(data => {
                    this.formationData = data.formation;
                    // Initialize isOpen property for each module
                    if (this.formationData?.program?.modules) {
                        this.formationData.program.modules.forEach((module: any) => {
                            module.isOpen = false;
                        });
                    }
                });
        }
    }

    scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        const headerOffset = 70; // Adjust this value based on your header height

        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            this.activeSection = sectionId;
        }
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        const sections = [
            'section-target',
            'section-prerequisites',
            'section-objectives',
            'section-program'
        ];
        const headerOffset = 70;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= headerOffset && rect.bottom > headerOffset) {
                    this.activeSection = section;
                    break;
                }
            }
        }
    }

    toggleModule(index: number): void {
        if (this.formationData?.program?.modules) {
            this.formationData.program.modules[index].isOpen =
                !this.formationData.program.modules[index].isOpen;
        }
    }
}
