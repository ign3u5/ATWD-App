import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slideshow-gallery',
  templateUrl: './slideshow-gallery.component.html',
  styleUrls: ['./slideshow-gallery.component.scss']
})
export class SlideshowGalleryComponent implements OnInit {

  imageSrcs = ['https://api.ws311471.remote.ac/images/bear.jpg',
'https://api.ws311471.remote.ac/images/blue_lake_man.jpg',
'https://api.ws311471.remote.ac/images/finding_us.jpg',
'https://api.ws311471.remote.ac/images/girl_woods.jpg',
'https://api.ws311471.remote.ac/images/phone_photo.jpg'];
  currentSlide = 1;

  constructor() { }

  ngOnInit(): void {
  }

  plusSlide(numberOfSlides: number) {
    if (this.currentSlide + numberOfSlides > this.imageSrcs.length)
    {
      this.currentSlide = 1;
    }
    else if (this.currentSlide + numberOfSlides < 1)
    {
      this.currentSlide = this.imageSrcs.length;
    }
    else
    {
      this.currentSlide += numberOfSlides;
    }
    
  }

  showSlide(slideIndex: number) {
    this.currentSlide = slideIndex + 1;
  }

}
