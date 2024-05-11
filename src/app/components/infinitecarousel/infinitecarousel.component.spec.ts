import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinitecarouselComponent } from './infinitecarousel.component';

describe('InfinitecarouselComponent', () => {
  let component: InfinitecarouselComponent;
  let fixture: ComponentFixture<InfinitecarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfinitecarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfinitecarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
