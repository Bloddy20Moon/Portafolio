import { Component, Input } from '@angular/core';
import { FormularioComponent } from '../components/formulario/formulario.component';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  
}
