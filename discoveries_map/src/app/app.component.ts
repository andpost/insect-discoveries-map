import { Component, OnInit, Injectable } from '@angular/core';
import { environment } from './../environments/environment';

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
    this.amountCarouselPictures = environment.amountCarouselPictures;
    this.carouselPictureNumbers = Array.from(Array(this.amountCarouselPictures).keys());
  }

  ngOnInit() {
    
  }

  
  
}
