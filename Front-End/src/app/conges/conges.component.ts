import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, Inject, AfterViewInit
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../../services/upload-file.service';
import * as _moment from 'moment';
import {CongesService} from '../../services/conges.service';
import {conge} from '../model/model.conge';
import {MatSnackBar} from '@angular/material';
import {employee} from '../model/model.employee';
import * as _momentW from 'moment-business-days';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
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
import {AuthService} from '../../services/auth.service';
import {forEach} from '@angular/router/src/utils/collection';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css'],

})
export class CongesComponent implements OnInit,AfterViewInit {

  constructor(private _formBuilder: FormBuilder, private uploadService: UploadFileService,
              private congesService: CongesService, public snackBar: MatSnackBar, public dialog: MatDialog
              ,private activatedRoute: ActivatedRoute,private title:Title,private modal: NgbModal,private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.activatedRoute.queryParams.subscribe(params => {
  this.action = params['action'];
  this.calc=false;
  this.title.setTitle("Listes des demandes de congés - COSUMAR");

});

}
ngAfterViewInit(){
 // this.getCongesByID();
}
  firstFormGroup: FormGroup;
  currentUser: employee = new employee();
  DepandenceDay: string = '11-01-2018';
  NewYearDay: string = '01-01-2018';
  IsPossible : boolean=true;
  lastConge:conge=new conge();
  progresss:boolean=false;
  ngOnInit() {
/*
    _momentW.locale('us', {
      holidays: [this.DepandenceDay, this.NewYearDay],
      holidayFormat: 'DD-MM-YYYY',
      workingWeekdays: [0, 1, 2, 3, 4]

    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
   this.getCongesByID();
   this.GetConges();
    this.firstFormGroup = this._formBuilder.group({
      DateDebut: ['', [Validators.required]],
      type: ['', [Validators.required]],
      DateFin: ['', [Validators.required]],
      description: ['',]
    });

console.log(this.pageConges);*/
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
    this.action='modifier';
    this.attachement = cong.attachement;
    this.firstFormGroup.controls['DateFin'].setValue(cong.dateFin);
    this.firstFormGroup.controls['DateDebut'].setValue(cong.dateDebut);
    this.firstFormGroup.controls['description'].setValue(cong.description);
    this.firstFormGroup.controls['type'].setValue(cong.type);
  }
  modifier(){

    this.congesService.modiConge(this.cong.idC,this.cong);

    this.openSnackBar('Modification réussi', '');
    this.action="consulter";
  }

  ///get conges
  id: number = this.currentUser.matricule;
  page: number = 0;
  size: number = 5;
  pageConges: any;
  ArrayS: number;
  action:string;
  pages: Array<number>;
  getCongesByID() {
if(this.action!='traite'){
    /*this.congesService.GetCongesByID(this.currentUser.matricule, this.page, this.size).subscribe(value => {
      console.log(value);
      this.pageConges = value;
      console.log(value.content[0]);
      this.lastConge=value.content[0];
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;
      for(let cong of this.pageConges.content){
        this.events.push({
          title: 'Conge id = '+cong['idC'],
          start: startOfDay(cong['dateDebut']),
          end: endOfDay(cong['dateFin']),
          color: colors.yellow,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        });
      }
      this.refresh.next();

    });*/
  }
  }

  GetConges() {

    if(this.action=='traite'){

    this.congesService.GetConges().subscribe(value => {
        console.log("traitement");
        this.pageConges = value;
        console.log(value.content[0]);
        this.lastConge=value.content[0];
        this.pages = new Array(value.totalPages);
        this.ArrayS = value.totalPages;

    });

    }


  }

  annuler() {
    this.firstFormGroup.reset();
    this.action = 'consulter';
  }


  //upload file
  gotoPage(i: number) {
    if (i < 0) i = 0;
    if (i > this.pages.length) i = this.pages.length;
    this.page = i;
    this.getCongesByID();
  }

  cong: conge = new conge();


  demander() {


    this.cong.attachement = this.attachement;
    this.cong.dateFin = _moment(this.DateFin.value).format('YYYY-MM-DD');
    this.cong.dateDebut = _moment(this.DateDebut.value).format('YYYY-MM-DD');
    this.cong.description = this.description.value;
    this.cong.status = 0;
    this.cong.type = this.type.value;
    this.cong.dure = this.nbr;
    this.cong.personne_id = 1;

    console.log(this.cong);


    this.congesService.AddConge(this.cong);
    this.openSnackBar('Votre demande est effectué', '');
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

  ///Calendrier congé

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    /* {
       start: subDays(startOfDay(new Date()), 1),
       end: addDays(new Date(), 1),
       title: 'A 3 day event',
       color: colors.red,
       actions: this.actions
     },
     {
       start: startOfDay(new Date()),
       title: 'An event with no end date',
       color: colors.yellow,
       actions: this.actions
     },
     {
       start: subDays(endOfMonth(new Date()), 3),
       end: addDays(endOfMonth(new Date()), 3),
       title: 'A long event that spans 2 months',
       color: colors.blue
     },
     {
       start: addHours(startOfDay(new Date()), 2),
       end: new Date(),
       title: 'A draggable and resizable event',
       color: colors.yellow,
       actions: this.actions,
       resizable: {
         beforeStart: true,
         afterEnd: true
       },
       draggable: true
     }*/
  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}


@Component({
  template: '<h1 mat-dialog-title>Supression </h1>\n' +
  '<div mat-dialog-content>\n' +
  '  \n' +
  '  Voulez vous supprimer  la demande de duré:<strong>{{data.dure}}</strong> ' +
  '  et identifiant : <strong> {{data.id}}</strong> ' +
  '</div>\n' +
  '<div mat-dialog-actions>\n' +
  '  <button mat-button mat-dialog-close=\'\'>Annuler</button>\n' +
  '  <button mat-button [mat-dialog-close]=\'true\' cdkFocusInitial>Ok</button>\n' +
  '</div>'
})
export class DialogOverviewExampleDialog2 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



