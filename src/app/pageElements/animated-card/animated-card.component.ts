import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'animated-card',
  templateUrl: './animated-card.component.html',
  styleUrls: ['./animated-card.component.scss']
})
export class AnimatedCardComponent implements OnInit {
  @ViewChild('card') card;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    const height = window.innerHeight;
    const width = window.innerWidth;
    // Creates angles of (-20, -20) (left, bottom) and (20, 20) (right, top)
    const yAxisDegree = event.pageX / width * 40 - 20;
    const xAxisDegree = event.pageY / height * -1 * 40 + 20;
    this.card.nativeElement.style.transform = `rotateY(${yAxisDegree}deg) rotateX(${xAxisDegree}deg)`;
    // Set the sheen position
    this.setSheenPosition(event.pageX / width, event.pageY / width);
  }

  constructor() { }

  ngOnInit(): void {
  }

  setSheenPosition(xRatio, yRatio) {
    // This creates a "distance" up to 400px each direction to offset the sheen
    const xOffset = 1 - (xRatio - 0.5) * 800;
    const yOffset = 1 - (yRatio - 0.5) * 800;
    this.card.nativeElement.style.setProperty('--sheenX', `${xOffset}px`)
    this.card.nativeElement.style.setProperty('--sheenY', `${yOffset}px`)
  }

}
