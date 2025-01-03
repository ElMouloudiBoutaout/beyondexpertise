import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
    styleUrls: ['./formation.component.scss'],
    animations: [
        trigger('sectionAnimation', [
            state('void', style({
                opacity: 0,
                transform: 'translateY(20px)'
            })),
            state('*', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('void => *', [
                animate('0.4s ease-out')
            ]),
            transition('* => void', [
                animate('0.3s ease-in')
            ])
        ])
    ]
})
export class FormationComponent implements OnInit {
    formationData: any;
    activeSection: string = 'section-target';
    showContactModal = false;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadFormationData();
        this.activeSection = 'section-target';
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
        this.activeSection = sectionId;
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        // Remove this method or leave it empty
    }

    toggleModule(index: number): void {
        if (this.formationData?.program?.modules) {
            this.formationData.program.modules[index].isOpen =
                !this.formationData.program.modules[index].isOpen;
        }
    }

    navigateToContact() {
        this.router.navigate(['/'], { fragment: 'contact' }).then(() => {
            // Small delay to ensure the fragment is processed after navigation
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    }

    openContactModal() {
        this.showContactModal = true;
    }

    closeContactModal() {
        this.showContactModal = false;
    }
}
