import { Component, OnInit } from '@angular/core';
import { stagiaire } from "../model/model.stagiaire";
import {StagiaireService} from "../../services/stagiaire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatSnackBar} from "@angular/material";
import {Title} from "@angular/platform-browser";
import {Http} from "@angular/http";
import *  as _moment from 'moment';
import {DialogOverviewExampleDialog} from "../employee/employee.component";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadFileService} from "../../services/upload-file.service";

@Component({
  selector: 'app-stagiaire-rh',
  templateUrl: './stagiaire-rh.component.html',
  styleUrls: ['./stagiaire-rh.component.css']
})
export class StagiaireRHComponent implements OnInit {

  constructor(private http: Http, public SerStag: StagiaireService,public dialog: MatDialog,
              private _formBuilder: FormBuilder, private titleService: Title,public snackBar: MatSnackBar,private uploadService: UploadFileService) { }

  cv:String;
  demandeStage:String;
  pageStagiaires: any;
  motCle:String = '';
  size: number = 5;
  page: number = 0;
  pages: Array<number>;
  ArrayS: number;

  stagiaire:stagiaire= new stagiaire();
  mode:number=0;
  firstFormGroup: FormGroup;
  animate;
  get nom(): any {
    return this.firstFormGroup.get('nom');
  }

  get prenom(): any {
    return this.firstFormGroup.get('prenom');
  }
  get service(): any {
    return this.firstFormGroup.get('service');
  }

  doSearch() {
    console.log(this.motCle);
    this.SerStag.getStagiaires(this.motCle, this.page, this.size).subscribe(value => {
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
  chargerStag(stag:stagiaire) {
    console.log(stag);
    this.stagiaire.idS=stag.idS;
    this.mode = 2;
    this.firstFormGroup.controls['nom'].setValue(stag.nom);
    this.firstFormGroup.controls['prenom'].setValue(stag.prenom);
  }


  annuler(){
    this.firstFormGroup.reset();
    this.mode=0;
  }
  updateStag(){
    this.setValue();
    this.SerStag.modiStagiaire(this.stagiaire.idS,this.stagiaire).subscribe(value => {
      this.doSearch();
      console.log(value);
      this.annuler();
      this.mode=0;
      this.openSnackBar("Modification réussi","Modification ");

    }, error1 => console.log(error1));

  }
  CurrentVisit:stagiaire;

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
      tel: ['',Validators.required],
      service:['',Validators.required],
    });
    this.titleService.setTitle('Gestion des stagiaires - Cosumar');

  }

  setValue() {
    this.stagiaire.nom=this.nom.value;
    this.stagiaire.prenom=this.prenom.value;
    this.stagiaire.service=this.service.value;
    this.stagiaire.etatDemande=0;
    this.stagiaire.demandeStage=this.demandeStage;
    this.stagiaire.cv=this.cv;
    console.log(this.stagiaire);
  }

  saveStag() {

    this.setValue();
    console.log(this.stagiaire.nom);
    console.log(this.stagiaire.prenom);
    console.log(this.stagiaire.cv);
    console.log(this.stagiaire.demandeStage);
    console.log(this.stagiaire.service);
    console.log(this.stagiaire);
    this.SerStag.AddStagiaire(this.stagiaire).subscribe(value => {
      console.log(value);
      this.annuler();
      this.openSnackBar("stagiaire ajouté avec succes","Ajoute");
      this.doSearch();
      this.mode=0;
    }, error1 => console.log(error1));
  }

  suppVisit(matricule: number) {
    this.SerStag.suppStagiaire(matricule).subscribe(value => {
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



  selectedFiles1: FileList;
  selectedFiles2: FileList;
  currentFileUpload1: File;
  currentFileUpload2: File;
  progress1: { percentage1: number } = { percentage1: 0 };
  progress2: { percentage2: number } = { percentage2: 0 };
  selectFile1(event) {
    this.selectedFiles1 = event.target.files;
  }

  selectFile2(event) {
    this.selectedFiles2 = event.target.files;
  }
  uploadCV() {
    this.progress1.percentage1 = 0;

    this.currentFileUpload1 = this.selectedFiles1.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload1).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress1.percentage1 = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.stagiaire.cv=this.selectedFiles1.item(0).name;
    this.cv=this.stagiaire.cv;
    this.selectedFiles1 = undefined;

  }
  uploadDemandeStage() {
    this.progress2.percentage2 = 0;

    this.currentFileUpload2 = this.selectedFiles2.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload2).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress2.percentage2 = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.stagiaire.demandeStage=this.selectedFiles2.item(0).name;
    this.demandeStage=this.stagiaire.demandeStage;
    this.selectedFiles2 = undefined;
  }

}
