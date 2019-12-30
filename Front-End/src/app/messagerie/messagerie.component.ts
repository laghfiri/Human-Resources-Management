import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {MessagerieService} from "../../services/messagerie.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {messagerie} from "../model/model.messagerie";
import {DialogOverviewExampleDialog} from "../employee/employee.component";
import * as _moment from 'moment';
import {EmployeeService} from "../../services/employee.service";
import {UploadFileService} from "../../services/upload-file.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {employee} from '../model/model.employee';
@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {

  constructor( private http: Http, public SerMsg: MessagerieService,public SerEmployes: EmployeeService,public dialog: MatDialog,
               private _formBuilder: FormBuilder, private titleService: Title,public snackBar: MatSnackBar,private uploadService: UploadFileService) { }
  msg:any;
  serviceMot:String;
  // id Emeterur
  idE:number;
  CurrentEmp:employee=new employee();
  // id Recepteur
  idR:number;
  pageMessagesI:any;
  pageMessagesE:any;
  pageMessagesS:any;
  pageEmployes:any;
  size: number = 10;
  page: number = 0;
  pages: Array<number>;
  ArrayS: number;
  NNotif:number;
  messagerie: messagerie = new messagerie();
  mode:number=0;
  firstFormGroup: FormGroup;
  animate;
  attachement1:String;
  attachement2:String;

  idM:number;
//  get idM():any{
  //  return this.firstFormGroup.get('idM');
  //}
  get subject(): any {
    return this.firstFormGroup.get('subject');
  }

  get body(): any {
    return this.firstFormGroup.get('body');
  }


  compose(){
    this.mode=1;
  }
  backToInbox(){
    this.mode=0;
    this.actualiser();
  }
  mettreEnLu(mesg:any){
    mesg.lu=1;
    this.SerMsg.modiMessage(mesg.idM,mesg).subscribe(value => {
      this.doSearchI();
    }, error1 => console.log(error1));
  }

  actualiser(){
    this.notif();
    this.doSearchS();
    this.doSearchE();
    this.doSearchI();
  }
  read(mesg:any){
    this.mode=2;
    this.mettreEnLu(mesg);
    this.actualiser();
    this.msg=mesg;
  }
  readS(mesg:any){
    this.mode=5;
    this.msg=mesg;
    console.log(this.msg);
  }
  MessageEnvoyer(){
    this.mode=3;
    this.doSearchE();
  }
  corbeille(){
    this.mode=4;
    this.doSearchS();
  }
  doSearchI() {
    this.SerMsg.getMessagesByIdR(this.idR, this.page, this.size).subscribe(value => {
      this.pageMessagesI = value;
      console.log(value);
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
    });
  }
  notif(){
    this.SerMsg.notification(this.idE).subscribe(value=>{
      this.NNotif=value;
      console.log(this.NNotif);
    })
  }
  doSearchE() {
    this.SerMsg.getMessagesByIdE(this.idE, this.page, this.size).subscribe(value => {
      this.pageMessagesE = value;
      console.log(value);
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
    });
  }
  doSearchS() {
    this.SerMsg.getMessagesSupprim(this.idE,this.idR, this.page, this.size).subscribe(value => {
      this.pageMessagesS = value;
      console.log(value);
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
    });
  }
  chercherI() {
    this.page=0;
    this.doSearchI();
  }
  chercherE() {
    this.page=0;
    this.doSearchE();
  }
  chercherS() {
    this.page=0;
    this.doSearchS();
  }

  gotoPageI(i: number) {
    if (i < 0) i = 0;
    if (i > this.pages.length) i = this.pages.length;
    this.page = i;
    this.doSearchI();
  }
  gotoPageE(i: number) {
    if (i < 0) i = 0;
    if (i > this.pages.length) i = this.pages.length;
    this.page = i;
    this.doSearchE();
  }
  gotoPageS(i: number) {
    if (i < 0) i = 0;
    if (i > this.pages.length) i = this.pages.length;
    this.page = i;
    this.doSearchS();
  }
  chargerMessage(Msg:messagerie) {
    console.log(Msg);
    this.messagerie.idM=Msg.idM;
    this.mode = 2;
    this.firstFormGroup.controls['body'].setValue(Msg.body);
    this.firstFormGroup.controls['subject'].setValue(Msg.subject);
    this.firstFormGroup.controls['idR'].setValue(Msg.idR);
    this.firstFormGroup.controls['idE'].setValue(Msg.idE);
    this.firstFormGroup.controls['lu'].setValue(Msg.lu);
    this.firstFormGroup.controls['dateE'].setValue(Msg.dateE);
    this.firstFormGroup.controls['heureE'].setValue(Msg.heureE);
    this.firstFormGroup.controls['attachement1'].setValue(Msg.attachement1);
    this.firstFormGroup.controls['attachement2'].setValue(Msg.attachement2);
  }


  annuler(){
    this.firstFormGroup.reset();
    this.mode=0;
  }
  mettreEnCorbeille(msg:any){
    msg.supprimer=1;
    console.log(msg);
    this.SerMsg.modiMessage(this.msg.idM,this.msg).subscribe(value => {
      this.doSearchI();
      console.log(value);
      this.annuler();
      this.mode=0;
      this.openSnackBar("Message en corbeille","Supprission ");

    }, error1 => console.log(error1));

  }
  updateMessage(){
    this.setValue();
    this.SerMsg.modiMessage(this.messagerie.idM,this.messagerie).subscribe(value => {
      this.actualiser();
      console.log(value);
      this.annuler();
      this.mode=0;
      this.openSnackBar("Modification réussi","Modification ");

    }, error1 => console.log(error1));

  }
  chargerEmpbyService(){

    this.SerEmployes.getEmployesService(this.serviceMot, this.page, 50000).subscribe(value => {
      this.pageEmployes = value;
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
    });
  }
  ngOnInit() {
    this.CurrentEmp=JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.CurrentEmp);
    //console.log(this.CurrentEmp.matricule);
    this.idR=this.CurrentEmp.matricule;
    this.idE = this.CurrentEmp.matricule;
    this.notif();
    setTimeout(() => this.animate = 'start', 1000);
    this.actualiser();
    this.firstFormGroup = this._formBuilder.group({
      subject:['',Validators.required],
      body:['',Validators.required],
      serviceMot:['',Validators.required],
      idR:['',Validators.required],
      idM:['',Validators.required],
    });
    this.titleService.setTitle('Boite de Messagerie - Cosumar');

  }
  setValue() {

    this.messagerie.body=this.body.value;
    this.messagerie.dateE=_moment(Date.now()).format('YYYY-MM-DD');
    this.messagerie.heureE=_moment(Date.now()).format('HH:mm');
    this.messagerie.subject=this.subject.value;
    this.messagerie.idE=this.idE;
    this.messagerie.idR=this.idR;
    this.messagerie.attachement1=this.attachement1;
    this.messagerie.attachement2=this.attachement2;
    console.log(this.messagerie);
  }

  saveMessage() {
    this.setValue();
    this.SerMsg.saveMessage(this.messagerie).subscribe(value => {
      console.log(value);
      this.annuler();
      this.openSnackBar("Messgae Envoyer avec succes","Envoie");
      this.doSearchI();
      this.mode=0;
    }, error1 => console.log(error1));
  }

  suppMsg(matricule: number) {
    this.SerMsg.suppMsg(matricule).subscribe(value => {
      this.doSearchS();
      console.log(value);
    }, error1 => console.log(error1));
    this.mode=4;

  }
  openDialog(matricule: number, nom: string): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '260px',
      data: {mat: matricule, nom: nom}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.suppMsg(matricule);
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
  upload1() {
    this.progress1.percentage1 = 0;

    this.currentFileUpload1 = this.selectedFiles1.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload1).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress1.percentage1 = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.messagerie.attachement1=this.selectedFiles1.item(0).name;
    this.attachement1=this.messagerie.attachement1;
    this.selectedFiles1 = undefined;

  }
  upload2() {
    this.progress2.percentage2 = 0;

    this.currentFileUpload2 = this.selectedFiles2.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload2).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress2.percentage2 = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.messagerie.attachement2=this.selectedFiles2.item(0).name;
    this.attachement2=this.messagerie.attachement2;
    this.selectedFiles2 = undefined;
  }
}
