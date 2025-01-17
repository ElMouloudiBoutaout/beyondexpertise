import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sticky-contact',
    templateUrl: './sticky-contact.component.html',
    styleUrls: ['./sticky-contact.component.scss'],
    animations: [
        trigger('vibrate', [
            state('start', style({
                transform: 'translate(0)'
            })),
            state('end', style({
                transform: 'translate(0)'
            })),
            transition('start <=> end', [
                animate('0.1s', style({ transform: 'translate(-4px, -2px)' })),
                animate('0.1s', style({ transform: 'translate(4px, 2px)' })),
                animate('0.1s', style({ transform: 'translate(-3px, -1px)' })),
                animate('0.1s', style({ transform: 'translate(3px, 1px)' })),
                animate('0.1s', style({ transform: 'translate(-2px, -1px)' })),
                animate('0.1s', style({ transform: 'translate(2px, 1px)' })),
                animate('0.1s', style({ transform: 'translate(0)' }))
            ])
        ])
    ]
})
export class StickyContactComponent {
    vibrateState = 'start';

    constructor(private router: Router) {
        setInterval(() => {
            this.vibrateState = this.vibrateState === 'start' ? 'end' : 'start';
        }, 3000);
    }

    navigateToContact() {
        this.router.navigate(['/'], { fragment: 'contact' }).then(() => {
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    }
}
