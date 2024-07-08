import { Component, ElementRef, AfterViewInit } from '@angular/core';

interface carousel{
  imgUrl: string;
}

@Component({
  selector: 'app-infinitecarousel',
  standalone: true,
  imports: [],
  templateUrl: './infinitecarousel.component.html',
  styleUrl: './infinitecarousel.component.scss'
})
export class InfinitecarouselComponent  implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    const copy: Node = this.elRef.nativeElement.querySelector(".logos-slide").cloneNode(true);
    this.elRef.nativeElement.querySelector(".logos").appendChild(copy);
  }
   
   carousels: carousel[] = [
    {
      imgUrl: 'assets/img/carousel/html.svg',
    },
    {
      imgUrl:'assets/img/carousel/css.svg',
    },
    {
      imgUrl: 'assets/img/carousel/javascript.svg',
    },
    {
      imgUrl: 'assets/img/carousel/ts.svg',
    },
    {
      imgUrl: 'assets/img/carousel/sass.svg',
    },
    {
      imgUrl: 'assets/img/carousel/nodejs.svg',
    },
    {
      imgUrl: 'assets/img/carousel/wordpress.svg',
    },
    {
      imgUrl: 'assets/img/carousel/bootstrap.svg',
    },
    {
      imgUrl: 'assets/img/carousel/php.svg',
    },
    {
      imgUrl: 'assets/img/carousel/elementor.svg',
    },
  ];
   
}
