import { Component, OnInit } from '@angular/core';
import {visiteur} from "../model/model.visiteur";
import {VisiteurService} from "../../services/visiteur.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatSnackBar} from "@angular/material";
import {Title} from "@angular/platform-browser";
import {Http} from "@angular/http";
import *  as _moment from 'moment';
import {DialogOverviewExampleDialog} from "../employee/employee.component";

@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css']
})
export class VisiteurComponent implements OnInit {

  constructor(private http: Http, public SerVisit: VisiteurService,public dialog: MatDialog,
              private _formBuilder: FormBuilder, private titleService: Title,public snackBar: MatSnackBar) {
  }

  pageVisiteurs: any;
  motCle:String = '';
  size: number = 5;
  page: number = 0;
  pages: Array<number>;
  ArrayS: number;
  visiteur: visiteur = new visiteur();
  mode:number=0;
  firstFormGroup: FormGroup;
  animate;
  get nom(): any {
    return this.firstFormGroup.get('nom');
  }

  get prenom(): any {
    return this.firstFormGroup.get('prenom');
  }
  get cin(): any {
    return this.firstFormGroup.get('cin');
  }

  get dateEntree():any{
    return this.firstFormGroup.get('dateEntree');
  }
  doSearch() {
    console.log(this.motCle);
    this.SerVisit.getVisiteurs(this.motCle, this.page, this.size).subscribe(value => {
      this.pageVisiteurs = value;
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
  chargerVisit(visit:visiteur) {
    console.log(visit);
    this.visiteur.idV=visit.idV;
    this.mode = 2;
    this.firstFormGroup.controls['nom'].setValue(visit.nom);
    this.firstFormGroup.controls['prenom'].setValue(visit.prenom);
    this.firstFormGroup.controls['cin'].setValue(visit.cin);
    this.firstFormGroup.controls['dateEntree'].setValue(visit.dateEntree);
  }


  annuler(){
    this.firstFormGroup.reset();
    this.mode=0;
  }
  updateVisit(){
    this.setValue();
    this.SerVisit.modivisiteur(this.visiteur.idV,this.visiteur).subscribe(value => {
      this.doSearch();
      console.log(value);
      this.annuler();
      this.mode=0;
      this.openSnackBar("Modification réussi","Modification ");

    }, error1 => console.log(error1));

  }
  CurrentVisit:visiteur;
  ngOnInit() {

    //this.CurrentEmp=JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.CurrentEmp);
    //console.log(this.CurrentEmp.matricule);
    setTimeout(() => this.animate = 'start', 1000);
    this.doSearch();
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      prenom: ['', [Validators.required, Validators.minLength(4)]],
      cin:['',Validators.required],
      dateEntree: ['',Validators.required],
    });
    this.titleService.setTitle('Gestion des Visiteurs - Cosumar');

  }

  setValue() {

    this.visiteur.cin=this.cin.value;
    this.visiteur.dateEntree=_moment(this.dateEntree.value).format('YYYY-MM-DD');
    this.visiteur.nom=this.nom.value;
    this.visiteur.prenom=this.prenom.value;
    console.log(this.visiteur);
  }

  saveVisit() {
    this.setValue();
    this.SerVisit.AddVisiteur(this.visiteur).subscribe(value => {
      console.log(value);
      this.annuler();
      this.openSnackBar("Visiteur ajouté avec succes","Ajoute");
      this.doSearch();
      this.mode=0;
    }, error1 => console.log(error1));
  }

  suppVisit(matricule: number) {
    this.SerVisit.suppVisiteur(matricule).subscribe(value => {
      this.doSearch();
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
        this.suppVisit(matricule);
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

