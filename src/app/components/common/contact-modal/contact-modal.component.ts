import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent {
  @Input() formationTitle: string = '';
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    name: '',
    email: '',
    phone_number: '',
    msg_subject: 'Inscription à la formation',
    message: ''
  };

  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(private emailService: EmailService) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    try {
      // Add formation title to the message
      const messageWithFormation = `Formation: ${this.formationTitle}\n\n${this.formData.message}`;
      const emailData = {
        ...this.formData,
        message: messageWithFormation
      };

      await this.emailService.sendEmail(emailData);
      this.showSuccessMessage = true;

      // Close modal after success
      setTimeout(() => {
        this.closeModal.emit();
      }, 2000);

    } catch (error) {
      console.error('Error sending email:', error);
      this.showErrorMessage = true;
    } finally {
      this.isSubmitting = false;
    }
  }

  close() {
    this.closeModal.emit();
  }
}
