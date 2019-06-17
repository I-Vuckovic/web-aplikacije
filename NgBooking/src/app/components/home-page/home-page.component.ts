import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private fromDestinations: string[];
  private toDestinations: string[];

  constructor() { }

  ngOnInit() {

    $(document).ready(() => {

      ($('.carousel.carousel-slider') as any).carousel({
        fullWidth: true,
        indicators: true
      });
    });

  }
}
