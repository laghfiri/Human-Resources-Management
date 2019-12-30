import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import {
  UploadFileService
} from '../../../services/upload-file.service';
import * as _moment from 'moment';
import {
  CongesService
} from '../../../services/conges.service';
import {
  conge
} from '../../model/model.conge';
import {
  MatSnackBar
} from '@angular/material';
import {
  employee
} from '../../model/model.employee';
import * as _momentW from 'moment-business-days';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  Title
} from '@angular/platform-browser';
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
import {
  Subject
} from 'rxjs';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK
} from 'angular-calendar';
import {
  AuthService
} from '../../../services/auth.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
@Component({
  selector: 'app-demander',
  templateUrl: './demander.component.html',
  styleUrls: ['./demander.component.css'],
})
export class DemanderComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private uploadService: UploadFileService,
    private congesService: CongesService, public snackBar: MatSnackBar, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private title: Title, private modal: NgbModal, private router: Router) {}

  firstFormGroup: FormGroup;
  errorSolde: boolean = false;
  currentUser: employee = new employee();
  //DepandenceDay: string = '11-01-2018';
  //NewYearDay: string = '01-01-2018';
  IsPossible: boolean = true;
  lastConge: conge = new conge();
  NombreJourDejaPris: number = 0;
  progresss: boolean = false;
  hold = [];
  hold1 = [];
  ngOnInit() {
    this.title.setTitle("Demander un congé - COSUMAR");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.congesService.GetCongesByID(this.currentUser.matricule, 0, 99).subscribe(value => {
      console.log(value);
      for (let item of value.content) {
        this.NombreJourDejaPris = this.NombreJourDejaPris * 1 + < number > item.dure * 1;
      }
      console.log(this.NombreJourDejaPris);
    });
    this.congesService.getJSON().subscribe(value => {
      for (let item of value.dates) {
        console.log(_moment(item).subtract(1, "days").format("YYYY-MM-DD"));
        this.hold.push(_moment(item).subtract(1, "days").format("YYYY-MM-DD"));
        this.hold1.push(item);
      }

    });
    console.log(this.hold);
    _momentW.locale('us', {
      holidays: this.hold,
      holidayFormat: 'YYYY-MM-DD',
      workingWeekdays: [0, 1, 2, 3, 4]

    });
    console.log(this.currentUser);
    this.firstFormGroup = this._formBuilder.group({
      DateDebut: ['', [Validators.required]],
      type: ['', [Validators.required]],
      DateFin: ['', [Validators.required]],
      description: ['', ]
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
  holdError: boolean;
  NbrJour() {
    this.calc = false;
    this.nbr = undefined;
    this.holdError = false;
    this.errorSolde = false;
    this.start = _moment(this.DateDebut.value).format('YYYY-MM-DD');
    this.end = _moment(this.DateFin.value).format('YYYY-MM-DD');
    console.log('nombre de jour' + this.nbr);
    /*
    this.nbr= Math.floor(_moment.duration(_moment(this.start,'YYYY-MM-DD')
      .diff(_moment(this.end,'YYYY-MM-DD'))).asDays()*(-1));
   */
    if (_moment(this.start).isSame(this.end)) {
      let i = -1;
      for (let item of this.hold1) {
        console.log(item + " ===? " + this.start);
        if (item == this.start) {
          i = i + 1;
          console.log("holiday found ");
          break;
        }
      }
      if (i != -1) this.holdError = true;
      else {
        this.nbr = 1;
        this.calc = true
      };
    }
    if (_moment(this.start).isBefore(this.end)) {
      if (this.NombreJourDejaPris < 25) {
        if (_momentW(this.end, 'YYYY-MM-DD').businessDiff(_momentW(this.start, 'YYYY-MM-DD')) * 1 + 1 + this.NombreJourDejaPris < 25) {
          this.nbr = _momentW(this.end, 'YYYY-MM-DD').businessDiff(_momentW(this.start, 'YYYY-MM-DD')) + 1;
          this.calc = true;
        } else this.errorSolde = true;

      } else {
        this.errorSolde = true;
      }

    }
    if (!_moment(this.start).isBefore(this.end) && !_moment(this.start).isSame(this.end)) {
      this.nbr = -1;
      this.firstFormGroup.reset();
    }

    console.log('nombre de jour' + this.nbr);
  }
  verifieStart() {

    this.nbr = undefined;
    this.start = _moment(this.DateDebut.value).format('YYYY-MM-DD');
    this.end = _moment(this.DateFin.value).format('YYYY-MM-DD');
    if (_moment(this.start).isSame(_moment(Date.now()).format('YYYY-MM-DD')) ||
      _moment(this.start).isBefore(_moment(Date.now()).format('YYYY-MM-DD'))) {
      this.nbr = -1;
    }
    this.congesService.verifieConge(this.start, 'info').subscribe(x => {
      this.IsPossible = < boolean > x;
      console.log("possible ?" + x);
    });

    console.log(this.IsPossible);
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
  progress: {
    percentage: number
  } = {
    percentage: 0
  };

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
}