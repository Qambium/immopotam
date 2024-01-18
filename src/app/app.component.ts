import { Component, OnInit} from '@angular/core';
import { FirebaseService } from './firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Immopotam';

  constructor( public db : FirebaseService){
    // config.placement = 'right';
  }



  ngOnInit() : void {






  }
}
