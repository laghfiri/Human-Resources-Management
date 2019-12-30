

import {Component,OnInit} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

constructor(public progress: NgProgress,private title:Title){
}

  ngOnInit(){
    this.title.setTitle("Acceuil - RhEnsaj");

  }
imprimer(){
this.progress.start();

}
}




