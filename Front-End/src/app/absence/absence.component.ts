import { Component, OnInit } from '@angular/core';
import {CongesService} from '../../services/conges.service';
import * as moment from 'moment';
import {PresenceService} from '../../services/presence.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  constructor(private PreSer:PresenceService) { }
  AbsenceGenerated:boolean;
  show:boolean=false;
  ListAbsence=[];
  dataLoaded:boolean=false;
  ngOnInit() {
    this.getAbsence();
    this.PreSer.VerifieAbsence(moment(new Date()).format('YYYY-MM-DD')).subscribe(value => {
      this.AbsenceGenerated=<boolean>value["_body"];
      this.dataLoaded=true;
      console.log(this.AbsenceGenerated);
    });

  }

  generateAbsence(){

    let date=moment(new Date()).format('YYYY-MM-DD');
    this.PreSer.GenerateAbsence(date).subscribe();
    this.show=true;
  }
  getAbsence(){
    this.PreSer.AbsenceToday(moment(new Date()).format('YYYY-MM-DD')).subscribe(value => {
      this.ListAbsence=value;
      console.log(this.ListAbsence);
    })
  }
}
