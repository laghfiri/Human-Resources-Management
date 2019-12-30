import { Component, OnInit } from '@angular/core';
import {StagiaireService} from "../../services/stagiaire.service";
import {Http} from "@angular/http";
import {MatDialog, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {stagiaire} from "../model/model.stagiaire";


@Component({
  selector: 'app-stagiaire-cs',
  templateUrl: './stagiaire-cs.component.html',
  styleUrls: ['./stagiaire-cs.component.css']
})
export class StagiaireCSComponent implements OnInit {


  constructor(private http: Http, public SerStag: StagiaireService,public dialog: MatDialog,
              private _formBuilder: FormBuilder, private titleService: Title,public snackBar: MatSnackBar) { }
  ser: String='Informatique';
  cv:String;
  demandeStage:String;
  mode:number=0;
  firstFormGroup: FormGroup;
  animate;
  motCle:String = '';
  size: number = 5;
  page: number = 0;
  pages: Array<number>;
  ArrayS: number;
  pageStagiaires: any;
  stagiaire:stagiaire= new stagiaire();
  doSearch() {
    console.log(this.motCle);
    this.SerStag.getStagiairesByService(this.motCle,this.ser, this.page, this.size).subscribe(value => {
      this.pageStagiaires = value;
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
  AccepterStag(stag:stagiaire) {
    console.log(stag);
    this.stagiaire=stag;
    this.stagiaire.etatDemande=2;
    this.SerStag.modiStagiaire(this.stagiaire.idS,this.stagiaire).subscribe(value=>{
      this.doSearch();
      console.log(value);
    })
    this.openSnackBar("Demande Acceptee","Acceptation");
  }
  RefuserStag(stag:stagiaire) {
    console.log(stag);
    this.stagiaire=stag;
    this.stagiaire.etatDemande=1;
    this.SerStag.modiStagiaire(this.stagiaire.idS,this.stagiaire).subscribe(value=>{
      this.doSearch();
      console.log(value);
    })
    this.openSnackBar("Demande Refuse","Annulation");
  }

  ngOnInit() {
    //this.CurrentEmp=JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.CurrentEmp);
    //console.log(this.CurrentEmp.matricule);
    setTimeout(() => this.animate = 'start', 1000);
    this.doSearch();
    this.titleService.setTitle('Gestion des stagiaires - Cosumar');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
