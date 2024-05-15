import { Component } from '@angular/core';
import { link } from 'node:fs';

interface Card {
  imageUrl: string;
  icon:string[]
  link: string[];
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  cards: Card[] = [
    {
      imageUrl: 'assets/img/card/zapateria1.png',
      icon:[
        'assets/img/card/iconos/angular.png',
        'assets/img/card/iconos/nestjs.png',
        'assets/img/card/iconos/mysqld.png',
        
      ],
      link: [
        'https://github.com/Bloddy20Moon/SistemaZapateriaFront'
      ]
    },

    {
      imageUrl: 'assets/img/card/TiendaBar.png',
      icon: [
        'assets/img/card/iconos/html.svg',
        'assets/img/card/iconos/css.svg',
        'assets/img/card/iconos/JavaScript.png',
      ],
      link: [
        'https://github.com/Bloddy20Moon/PagosCulqi'
      ]

    },

    {
      imageUrl: 'assets/img/card/Cortes.png',
      icon: [
        'assets/img/card/iconos/html.svg',
        'assets/img/card/iconos/css.svg',
        'assets/img/card/iconos/JavaScript.png',
      ],
      link: [
        'https://github.com/Bloddy20Moon/Wasap_Bot'
      ]
    },
    {
      imageUrl: 'assets/img/card/FruttiLovers.png',
      icon: [
        'assets/img/card/iconos/html.svg',
        'assets/img/card/iconos/css.svg',
        'assets/img/card/iconos/JavaScript.png',
      ],
      link: [
        'https://github.com/Bloddy20Moon/LandingPageCafeteria'
      ]
    },
    {
      imageUrl: 'assets/img/card/Inv.png',
      icon: [
        'assets/img/card/iconos/react.png',
        'assets/img/card/iconos/vite.png',
        'assets/img/card/iconos/superbase.png',
      ],
      link: [
        'https://github.com/Bloddy20Moon/InventarioFront'
      ]
    },
    
    
    

  ];
}
