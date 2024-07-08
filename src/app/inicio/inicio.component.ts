import { Component } from '@angular/core';
import {variable_texto_global} from '../environments/environments'
import { NgxTypedWriterModule } from 'ngx-typed-writer';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgxTypedWriterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  nombre = variable_texto_global.nombre

}
