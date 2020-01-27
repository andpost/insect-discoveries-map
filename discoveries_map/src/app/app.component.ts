import {Component, OnInit, Injectable} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  faHome = faHome;
  title = 'funde-map';

  constructor() {
  }

  ngOnInit() {

  }

}
