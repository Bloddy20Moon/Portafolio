import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      'default_service', // Reemplaza con tu Service ID de EmailJS
      'template_81ybvaf', // Reemplaza con tu Template ID de EmailJS
      formData,
      'xQzArsmWwmzOg1N4SDkjp' // Reemplaza con tu User ID de EmailJS
    );
  }
}
