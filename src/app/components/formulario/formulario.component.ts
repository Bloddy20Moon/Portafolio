import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  form: FormGroup = this.fb.group({
    from_name: '',
    to_name: 'Adrian',
    from_email: '',
    phone: '',
    message: '',
  });

  constructor(private fb: FormBuilder) {

  }

  async send() {
    emailjs.init('RfpOjmEm4FzGcl0FZ');
    let response = await emailjs.send("service_1f88f3d", "template_t889y48", {
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      from_email: this.form.value.from_email,
      phone: this.form.value.phone,
      message: this.form.value.message,
    });

   
    this.form.reset();
  }
}
