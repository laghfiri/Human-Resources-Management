import { Component, OnInit } from '@angular/core';
import *  as _moment from 'moment';
import {Http} from "@angular/http";
import {PresenceService} from "../../services/presence.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {presence} from "../model/model.presence";
import {visiteur} from "../model/model.visiteur";
import {DialogOverviewExampleDialog} from "../employee/employee.component";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

  constructor(private http: Http, public SerPrese: PresenceService,public SerEmployes: EmployeeService,public dialog: MatDialog,
              private _formBuilder: FormBuilder, private titleService: Title,public snackBar: MatSnackBar) { }

/*SELECT  matricule FROM personne where matricule not in (select personne_id   from presence where date_presence='2017-06-06'  )
Insert into absence ( date_absence,personne_id)
SELECT   '2017-06-06',matricule FROM personne where matricule not in (select personne_id   from presence where date_presence='2017-06-06'  ) */
  serviceMot:String;
  choix:String;
  pagePresences: any;
  pageEmployes:any;
  date:string = '';
  size: number = 5;
  page: number = 0;
  pages: Array<number>;
  ArrayS: number;
  presence: presence = new presence();
  mode:number=0;
  firstFormGroup: FormGroup;
  animate;
  get heureD(): any {
    return this.firstFormGroup.get('heureD');
  }

  get heureF(): any {
    return this.firstFormGroup.get('heureF');
  }
  get dateP(): any {
    return this.firstFormGroup.get('dateP');
  }

  get emp_id():any{
    return this.firstFormGroup.get('emp_id');
  }
  traitement(){
    if(this.choix==String(1)){
      this.savePresence();
    }
    if(this.choix==String(2)){
      this.SerPrese.getPresencesEmpByDateAndMatricule(this.emp_id.value,_moment(Date.now()).format('YYYY-MM-DD'),this.page, this.size).subscribe(value => {
        this.presence.idP=value.content[0].idP;
        this.presence.datePresence=value.content[0].datePresence;
        this.presence.personne_id=value.content[0].personne_id;
        this.presence.heureDpre=value.content[0].heureDpre;
        this.presence.heureFpre=_moment(Date.now()).format('HH:mm');
        this.presence.heureDdeu='';
        this.presence.heureFdeu='';
        this.pages = new Array(value.totalPages);
        this.ArrayS = value.totalPages;
        this.SerPrese.modiPresence(this.presence.idP,this.presence).subscribe(value => {
          this.doSearch1();
          console.log(value);
          this.annuler();
          this.mode=0;
          this.openSnackBar("Modification réussi","Modification ");

        }, error1 => console.log(error1));

      });
    }
    if(this.choix==String(3)){
      this.SerPrese.getPresencesEmpByDateAndMatricule(this.emp_id.value,_moment(Date.now()).format('YYYY-MM-DD'),this.page, this.size).subscribe(value => {
        this.presence.idP=value.content[0].idP;
        this.presence.datePresence=value.content[0].datePresence;
        this.presence.personne_id=value.content[0].personne_id;
        this.presence.heureDpre=value.content[0].heureDpre;
        this.presence.heureFpre=_moment(Date.now()).format('HH:mm');
        this.presence.heureDdeu=_moment(Date.now()).format('HH:mm');
        this.presence.heureFdeu='';
        this.pages = new Array(value.totalPages);
        this.ArrayS = value.totalPages;
        this.SerPrese.modiPresence(this.presence.idP,this.presence).subscribe(value => {
          this.doSearch1();
          console.log(value);
          this.annuler();
          this.mode=0;
          this.openSnackBar("Modification réussi","Modification ");

        }, error1 => console.log(error1));

      });

    }
    if(this.choix==String(4)){
      this.SerPrese.getPresencesEmpByDateAndMatricule(this.emp_id.value,_moment(Date.now()).format('YYYY-MM-DD'),this.page, this.size).subscribe(value => {
        this.presence.idP=value.content[0].idP;
        this.presence.datePresence=value.content[0].datePresence;
        this.presence.personne_id=value.content[0].personne_id;
        this.presence.heureDpre=value.content[0].heureDpre;
        this.presence.heureFpre=_moment(Date.now()).format('HH:mm');
        this.presence.heureDdeu=_moment(Date.now()).format('HH:mm');
        this.presence.heureFdeu=_moment(Date.now()).format('HH:mm');
        this.pages = new Array(value.totalPages);
        this.ArrayS = value.totalPages;
        this.SerPrese.modiPresence(this.presence.idP,this.presence).subscribe(value => {
          this.doSearch1();
          console.log(value);
          this.annuler();
          this.mode=0;
          this.openSnackBar("Modification réussi","Modification ");

        }, error1 => console.log(error1));

      });

    }
  }
  doSearch() {
   this.date=_moment(this.date).format("YYYY-MM-DD");
    this.SerPrese.getPresencesEmp(this.date, this.page, this.size).subscribe(value => {
      this.pagePresences = value;
      console.log(this.pagePresences);
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
    });
  }
  doSearch1() {
    this.SerPrese.getPresences( this.page, this.size).subscribe(value => {
      this.pagePresences = value;
      console.log(value);
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
    });
  }

  chercher() {
    this.page=0;
    this.doSearch();
  }

  gotoPage(i: number) {
    if (i < 0) i = 0;
    if (i > this.pages.length) i = this.pages.length;
    this.page = i;
    this.doSearch();
  }

  chargerEmpbyService(){

    this.SerEmployes.getEmployesService(this.serviceMot, 0, 99).subscribe(value => {
      this.pageEmployes = value;
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
    });
  }

  annuler(){
    this.firstFormGroup.reset();
    this.mode=0;
  }
  updatePresence(){
    this.setValue();
    this.SerPrese.modiPresence(this.presence.idP,this.presence).subscribe(value => {
      this.doSearch1();
      console.log(value);
      this.annuler();
      this.mode=0;
      this.openSnackBar("Modification réussi","Modification ");

    }, error1 => console.log(error1));

  }
  CurrentVisit:visiteur;

  ngOnInit() {
    setTimeout(() => this.animate = 'start', 1000);
    this.doSearch1();
    this.firstFormGroup = this._formBuilder.group({
      emp_id: ['',Validators.required],
      serviceMot:['',Validators.required],
      choix:['',Validators.required]
    });
    this.titleService.setTitle('Pointage - Cosumar');

  }

  setValue() {
    this.presence.heureDpre=_moment(Date.now()).format('HH:mm');
    this.presence.datePresence=_moment(Date.now()).format('YYYY-MM-DD');
    this.presence.personne_id=this.emp_id.value;
    console.log(this.presence);
  }

  savePresence() {
    this.setValue();
    this.SerPrese.AddPresence(this.presence).subscribe(value => {
      console.log(value);
      this.annuler();
      this.openSnackBar("Pointage ajouté avec succes","Ajoute");
      this.doSearch1();
      this.mode=0;
    }, error1 => console.log(error1));
  }

  suppPresence(matricule: number) {
    this.SerPrese.suppPresence(matricule).subscribe(value => {
      this.doSearch1();
      console.log(value);
    }, error1 => console.log(error1));
  }
  openDialog(matricule: number, nom: string): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '260px',
      data: {mat: matricule, nom: nom}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.suppPresence(matricule);
        this.openSnackBar(" Supression reussi ","Suppression");
      }

    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  }


