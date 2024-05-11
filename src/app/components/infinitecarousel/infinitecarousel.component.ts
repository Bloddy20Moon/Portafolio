import { Component, ElementRef, AfterViewInit } from '@angular/core';

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
}
