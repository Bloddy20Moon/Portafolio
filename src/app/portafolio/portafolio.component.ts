import { Component } from '@angular/core';
import { ContactoComponent } from '../contacto/contacto.component';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { CardsComponent } from '../components/cards/cards.component';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [ContactoComponent, NgxTypedWriterModule, CardsComponent],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.scss'
})
export class PortafolioComponent {

}
