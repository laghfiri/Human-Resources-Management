import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import * as Highcharts from 'highcharts';

declare var $: any;
import '../../assets/refresh'
import 'jquery';
import {employee} from '../model/model.employee';
import {MessagerieService} from '../../services/messagerie.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  options = {
    min: 8,
    max: 100,
    ease: 'linear',
    speed: 200,
    trickleSpeed: 300,
    meteor: true,
    spinner: true,
    spinnerPosition: 'right',
    direction: 'ltr+',
    color: 'red',
    thick: false
  };

  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(private activatedRoute:ActivatedRoute,public SerMsg: MessagerieService,private auth:AuthService) { }
  CurrentEmp:employee;
  Notif:number=0;
  ngOnInit(){

    $.navbar.activate();

    if(this.activatedRoute.snapshot.url[0]==undefined){
      this.activatedRoute.parent.url.subscribe((urlPath)=>{
        this.url=urlPath[urlPath.length-1].path;
      })
    }else this.url=this.activatedRoute.snapshot.url[0].path;
    //console.log('hhhhhh');
    this.CurrentEmp=JSON.parse(localStorage.getItem('currentUser'));
    console.log("url site " +this.url);
    this.SerMsg.notification(this.CurrentEmp.matricule).subscribe(value=>{
      this.Notif=value;
    })
  }
  url:string;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


  deconnexion(){
    this.auth.logOut();
  }

}
