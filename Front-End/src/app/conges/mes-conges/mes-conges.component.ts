import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, Inject, AfterViewInit
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../../../services/upload-file.service';
import * as _moment from 'moment';
import {CongesService} from '../../../services/conges.service';
import {conge} from '../../model/model.conge';
import {MatSnackBar} from '@angular/material';
import {employee} from '../../model/model.employee';
import * as _momentW from 'moment-business-days';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent, DAYS_OF_WEEK
} from 'angular-calendar';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogOverviewExampleDialog2} from '../conges.component';
@Component({
  selector: 'app-mes-conges',
  templateUrl: './mes-conges.component.html',
  styleUrls: ['./mes-conges.component.css']
})
export class MesCongesComponent implements OnInit {

  constructor( private congesService: CongesService,private _formBuilder: FormBuilder,
               public snackBar: MatSnackBar, public dialog: MatDialog, private uploadService: UploadFileService,private route:ActivatedRoute) { }
  firstFormGroup: FormGroup;
  currentUser: employee = new employee();
  DepandenceDay: string = '11-01-2018';
  NewYearDay: string = '01-01-2018';
  conges:any;
  dataLoaded:boolean=false;
  ngOnInit() {
    _momentW.locale('us', {
      holidays: [this.DepandenceDay, this.NewYearDay],
      holidayFormat: 'DD-MM-YYYY',
      workingWeekdays: [0, 1, 2, 3, 4]

    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getCongesByID();
    this.firstFormGroup = this._formBuilder.group({
      DateDebut: ['', [Validators.required]],
      type: ['', [Validators.required]],
      DateFin: ['', [Validators.required]],
      description: ['',]
    });
  }
  id: number = this.currentUser.matricule;
  page: number = 0;
  size: number = 5;
  pageConges: any;
  ArrayS: number;
  action:string='consulter';
  pages: Array<number>;
  lastConge:conge=new conge();
  JourRestant:number;
  getCongesByID() {

      this.congesService.GetCongesByID(this.currentUser.matricule, this.page, this.size).subscribe(value => {

        this.pageConges = value;
        this.dataLoaded=true;
        if(value.content.length>0){
        this.lastConge=value.content[0];
        console.log(value);
        let start:any=this.lastConge.dateFin;
        let end:any=new Date();
        let debut:any=this.lastConge.dateDebut;
        if(this.lastConge.status==2 && _moment(end, "YYYY-MM-DD").isBetween(debut,start , 'days', '[]') ){
          this.JourRestant=Math.floor(_moment.duration(_moment(start,'YYYY-MM-DD')
            .diff(_moment(end,'YYYY-MM-DD'))).asDays());
          console.log(this.JourRestant);
        }
        this.pages = new Array(value.totalPages);
        this.ArrayS = value.totalPages;
        }
      });

  }
  attachement: string;

  get DateDebut(): any {
    return this.firstFormGroup.get('DateDebut');
  }

  get type(): any {
    return this.firstFormGroup.get('type');
  }

  get DateFin(): any {
    return this.firstFormGroup.get('DateFin');
  }

  get description(): any {
    return this.firstFormGroup.get('description');
  }

  nbr: number;
  calc = false;
  start: any;
  end: any;

  NbrJour() {
    this.calc = false;
    this.start = _moment(this.DateDebut.value).format('YYYY-MM-DD');
    this.end = _moment(this.DateFin.value).format('YYYY-MM-DD');
    console.log('nombre de jour' + this.nbr);
    /*
    this.nbr= Math.floor(_moment.duration(_moment(this.start,'YYYY-MM-DD')
      .diff(_moment(this.end,'YYYY-MM-DD'))).asDays()*(-1));
   */
    if (_moment(this.start).isBefore(this.end) || _moment(this.start).isSame(this.end)) {
      this.nbr = _momentW(this.end, 'YYYY-MM-DD').businessDiff(_momentW(this.start, 'YYYY-MM-DD'))+1;
      this.calc = true;
    } else {
      this.nbr = -1;
      this.firstFormGroup.reset();
    }

    console.log('nombre de jour' + this.nbr);
  }
  IsPossible:boolean=true;
  verifieStart(){

    this.nbr=undefined;
    this.start = _moment(this.DateDebut.value).format('YYYY-MM-DD');
    this.end = _moment(this.DateFin.value).format('YYYY-MM-DD');
    if(_moment(this.start).isSame(_moment(Date.now()).format('YYYY-MM-DD'))
      || _moment(this.start).isBefore(_moment(Date.now()).format('YYYY-MM-DD'))){
      if(this.action!='modifier'){this.firstFormGroup.reset();}
      this.nbr=-1;
    }
    this.congesService.verifieConge( this.start,'info').subscribe(x=>{
      this.IsPossible =<boolean> x;
    });

    console.log(this.IsPossible);
  }
  PassToDirector(cong:conge){
    cong.status=1;
    this.congesService.modiConge(cong.idC,cong).subscribe(value => {
      console.log(cong);
      this.openSnackBar("Transférer au directeur","");

    }, error1 => console.log(error1));
  }
  chargerConge(cong:conge){
    this.cong.idC=cong.idC;
    this.action='modifier';
    this.cong.personne_id=this.currentUser.matricule;
    this.attachement = cong.attachement;
    this.firstFormGroup.controls['DateFin'].setValue(cong.dateFin);
    this.firstFormGroup.controls['DateDebut'].setValue(cong.dateDebut);
    this.firstFormGroup.controls['description'].setValue(cong.description);
    this.firstFormGroup.controls['type'].setValue(cong.type);
  }
  cong: conge = new conge();
  modifier(){
    this.cong.attachement=this.attachement;
    this.cong.status=0;
    this.cong.dure=_momentW(_moment(this.DateFin.value).format('YYYY-MM-DD'), 'YYYY-MM-DD').businessDiff(_momentW(_moment(this.DateDebut.value).format('YYYY-MM-DD'), 'YYYY-MM-DD'))+1;
    this.cong.description=this.description.value;
    this.cong.dateDebut=_moment(this.DateDebut.value).format('YYYY-MM-DD');
    this.cong.dateFin=_moment(this.DateFin.value).format('YYYY-MM-DD');
    this.cong.type=this.type.value;
    console.log(this.cong);
    this.congesService.modiConge(this.cong.idC,this.cong).subscribe(value => {
      this.openSnackBar('Modification congé réussi', '');
      this.action="consulter";
    }, error1 => console.log(error1));



  }
  gotoPage(i: number) {
    if (i < 0) i = 0;
    if (i > this.pages.length) i = this.pages.length;
    this.page = i;
    this.getCongesByID();
  }
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.attachement = this.selectedFiles.item(0).name;
    //this.photo="http://localhost:8080/files/"+this.employee.photo;
    this.selectedFiles = undefined;

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  openDialog(dure: number, id: number): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '260px',
      data: {dure: dure, id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.congesService.suppConge(id);
        this.getCongesByID();
        this.gotoPage(0);
        this.openSnackBar(' Demande a été supprimer', '');
      }

    });
  }
}
