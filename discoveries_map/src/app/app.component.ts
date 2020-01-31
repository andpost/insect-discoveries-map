import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {

  amountCarouselPictures: number;
  carouselPictureNumbers: number[];

  constructor() {
    this.amountCarouselPictures = 8;
    this.carouselPictureNumbers = Array.from(Array(this.amountCarouselPictures).keys());
  }

  ngOnInit() {
    
  }

  
  
}
