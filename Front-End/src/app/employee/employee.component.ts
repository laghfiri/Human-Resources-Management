import {
  employee
} from './../model/model.employee';
import {
  EmployeeService
} from './../../services/employee.service';
import {
  Title
} from '@angular/platform-browser';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';
import {
  Component,
  NgModule,
  OnInit,
  Input,
  Inject
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
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
} from '../../services/upload-file.service';
import * as _moment from 'moment';
import {
  Router
} from '@angular/router';
/*
declare var $: any;
import '../../assets/refresh'
*/

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],

})


export class EmployeeComponent implements OnInit {

  date: any;
  pageEmployes: any;
  motCle: String = '';
  size: number = 5;
  page: number = 0;
  pages: Array < number > ;
  ArrayS: number;
  employee: employee = new employee();
  mode: number = 0;
  photo: string;
  firstFormGroup: FormGroup;
  service: string;
  //ajouter employee
  secondFormGroup: FormGroup;
  animate;

  constructor(private http: Http, public SerEmployes: EmployeeService, public dialog: MatDialog,
    private _formBuilder: FormBuilder, private titleService: Title, public snackBar: MatSnackBar, private uploadService: UploadFileService, private router: Router) {

  }



  get nom(): any {
    return this.firstFormGroup.get('nom');
  }

  get prenom(): any {
    return this.firstFormGroup.get('prenom');
  }

  get sexe(): any {
    return this.firstFormGroup.get('sexe');
  }

  get email(): any {
    return this.firstFormGroup.get('email');
  }
  set nom1(value: any) {
    this.firstFormGroup.controls['nom'].setValue(value);
  }
  get tele(): any {
    return this.firstFormGroup.get('tele');
  }

  get ville(): any {
    return this.firstFormGroup.get('ville');
  }

  get Lnaissance(): any {
    return this.firstFormGroup.get('Lnaissance');
  }

  get adresse(): any {
    return this.firstFormGroup.get('adresse');
  }
  get DateDebut(): any {
    return this.secondFormGroup.get('DateDebut');
  }
  get DateFin(): any {
    return this.secondFormGroup.get('DateFin');
  }

  get Niveau(): any {
    return this.secondFormGroup.get('Niveau');
  }
  get Service(): any {
    return this.secondFormGroup.get('service');
  }
  get cin(): any {
    return this.firstFormGroup.get('cin');
  }
  doSearch() {
    this.SerEmployes.getEmployes(this.motCle, this.page, this.size).subscribe(value => {
      this.pageEmployes = value;
      this.pages = new Array(value.totalPages);
      this.ArrayS = this.pages.length;
    });

  }

  chercher() {
    this.service = "false";
    this.page = 0;
    this.doSearch();
  }

  chercherService() {
    console.log(this.service);
    this.SerEmployes.getEmployesService(this.service, this.page, this.size).subscribe(value => {
      this.pageEmployes = value;
      console.log(value);
      this.pages = new Array(value.totalPages);
      this.ArrayS = value.totalPages;

    });
  }
  gotoPage(i: number) {
    if (i < 0) i = 0;
    if (i > this.pages.length) i = this.pages.length;
    this.page = i;
    this.doSearch();
  }


  onSubmit(): void {
    this.employee.nom = this.nom.value;
    this.employee = this.prenom.value;
    console.log(this.employee);

  }
  chargerEmp(emp: employee) {
    console.log(emp);
    this.mode = 2;
    this.firstFormGroup.controls['nom'].setValue(emp.nom);
    this.firstFormGroup.controls['email'].setValue(emp.email);
    this.firstFormGroup.controls['adresse'].setValue(emp.adresse);
    this.firstFormGroup.controls['cin'].setValue(emp.cin);
    this.firstFormGroup.controls['tele'].setValue(emp.tele);
    this.firstFormGroup.controls['ville'].setValue(emp.ville);
    this.firstFormGroup.controls['Lnaissance'].setValue(emp.dateNaissance);
    this.firstFormGroup.controls['prenom'].setValue(emp.prenom);
    this.firstFormGroup.controls['sexe'].setValue(emp.sexe);

    this.secondFormGroup.controls['Niveau'].setValue(emp.niveauEtude);
    this.secondFormGroup.controls['service'].setValue(emp.service);
    this.secondFormGroup.controls['DateDebut'].setValue(emp.dateDeb);
    this.secondFormGroup.controls['DateFin'].setValue(emp.dateFin);
    this.employee.photo = emp.photo;
    this.employee.matricule = emp.matricule;

  }
  annuler() {
    this.secondFormGroup.reset();
    this.firstFormGroup.reset();
    this.mode = 0;
  }
  updateEmp() {
    this.SerEmployes.modiEmployee(this.employee.matricule, this.employee).subscribe(value => {

      this.doSearch();
      console.log(value);
      this.annuler();
      this.mode = 0;
      this.openSnackBar("Modification réussi", "Modification ");

    }, error1 => console.log(error1));

  }


  CurrentEmp: employee;
  ngOnInit() {
    this.CurrentEmp = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.CurrentEmp) {
      this.router.navigate(['login']);
    }
    console.log(this.CurrentEmp);
    setTimeout(() => this.animate = 'start', 1000);
    this.doSearch();
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      prenom: ['', [Validators.required, Validators.minLength(4)]],
      sexe: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tele: ['', [Validators.required, Validators.pattern('(^[6]+[0-9]{8}$)')]],
      ville: ['', ],
      Lnaissance: ['', ],
      adresse: ['', Validators.required],
      cin: ['', Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      DateDebut: ['', Validators.required],
      DateFin: ['', ],
      Niveau: ['', Validators.required],
      service: ['', Validators.required],
    });

    this.titleService.setTitle('Gestion des Employes - Cosumar');

  }

  setValue() {

    this.employee.email = this.email.value;
    this.employee.adresse = this.adresse.value;
    this.employee.cin = this.cin.value;
    this.employee.tele = this.tele.value;
    this.employee.ville = this.ville.value;
    console.log(this.Lnaissance.value);
    if (this.DateFin.value != null && this.DateFin.value != '') {
      this.employee.dateFin = _moment(this.DateFin.value).format('YYYY-MM-DD');
    }
    if (this.DateDebut.value != null && this.DateDebut.value != '') {
      this.employee.dateDeb = _moment(this.DateDebut.value).format('YYYY-MM-DD');
    }
    if (this.Lnaissance.value != null && this.Lnaissance.value != '') {
      this.employee.dateNaissance = _moment(this.Lnaissance.value).format('YYYY-MM-DD');
    }
    this.employee.nom = this.nom.value;
    this.employee.prenom = this.prenom.value;
    this.employee.niveauEtude = this.Niveau.value;
    this.employee.service = this.Service.value;
    this.employee.sexe = this.sexe.value;
    console.log(this.employee);
  }

  saveEmploye() {
    this.SerEmployes.saveEmployes(this.employee).subscribe(value => {
      this.progress.percentage = 0;
      console.log(value);
      this.annuler();
      this.openSnackBar("Employee ajouté avec succes", "Ajoute");
      this.doSearch();
      this.mode = 0;
    }, error1 => console.log(error1));
  }

  suppEmploye(matricule: number) {
    this.SerEmployes.suppEmployee(matricule).subscribe(value => {
      this.doSearch();
      console.log(value);
    }, error1 => console.log(error1));
  }


  openDialog(matricule: number, nom: string): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '260px',
      data: {
        mat: matricule,
        nom: nom
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.suppEmploye(matricule);
        this.openSnackBar(" Supression reussi ", "Suppression");
      }

    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ///Upload file


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
    this.employee.photo = this.selectedFiles.item(0).name;
    this.photo = "http://localhost:8080/files/" + this.employee.photo;
    this.selectedFiles = undefined;

  }

}

@Component({
  template: '<h1 mat-dialog-title>Supression </h1>\n' +
    '<div mat-dialog-content>\n' +
    ' \n' +
    ' Voulez vous vraiment supprimer l\'employee avec Matricule :<strong>{{data.mat}}</strong> ' +
    ' et nom : <strong> {{data.nom}}</strong> ' +
    '</div>\n' +
    '<div mat-dialog-actions>\n' +
    ' <button mat-button mat-dialog-close=\'\'>Annuler</button>\n' +
    ' <button mat-button [mat-dialog-close]=\'true\' cdkFocusInitial>Ok</button>\n' +
    '</div>'
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef < DialogOverviewExampleDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



}