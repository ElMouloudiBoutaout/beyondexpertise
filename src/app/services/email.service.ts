import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    private readonly SERVICE_ID = 'service_6x0slwk';
    private readonly TEMPLATE_ID = 'template_nzkyehb';
    private readonly PUBLIC_KEY = 'ncscsnPig5SK45N9_';

    constructor() {
        emailjs.init(this.PUBLIC_KEY);
    }

    async sendEmail(formData: any) {
        try {
            const response = await emailjs.send(
                this.SERVICE_ID,
                this.TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone_number,
                    subject: formData.msg_subject,
                    message: formData.message
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}
