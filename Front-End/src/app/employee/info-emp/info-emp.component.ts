import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {employee} from '../../model/model.employee';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../../../services/upload-file.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
import {EmployeeService} from '../../../services/employee.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-info-emp',
  templateUrl: './info-emp.component.html',
  styleUrls: ['./info-emp.component.css']
})
export class InfoEmpComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,private uploadService: UploadFileService,public snackBar: MatSnackBar
              ,private activatedRoute: ActivatedRoute,private title:Title,private modal: NgbModal,private EmpServ:EmployeeService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.action= params['action'];
      this.title.setTitle("Mes informations - COSUMAR");

    });}
  employee:employee=new employee();
  action:string;
  photo:string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
CurrentEmp:employee=new employee();
  ngOnInit() {
    this.action='modifier';
    console.log(this.action);
    this.CurrentEmp=JSON.parse(localStorage.getItem('currentUser'));
    this.photo="http://localhost:8080/files/"+this.CurrentEmp.photo;
    this.firstFormGroup = this._formBuilder.group({
      nom: [this.CurrentEmp.nom, [Validators.required, Validators.minLength(4)]],
      prenom: [this.CurrentEmp.prenom, [Validators.required, Validators.minLength(4)]],
      sexe: [this.CurrentEmp.sexe, Validators.required],
      email: [this.CurrentEmp.email, [Validators.required, Validators.email]],
      tele: [this.CurrentEmp.tele, [Validators.required, Validators.pattern('(^[6]+[0-9]{8}$)')]],
      ville: [this.CurrentEmp.ville,],
      Lnaissance: [this.CurrentEmp.lieuNaissance,],
      adresse: [this.CurrentEmp.adresse, Validators.required],
      cin:[this.CurrentEmp.adresse,Validators.required]

    });
    this.firstFormGroup.controls['sexe'].setValue(this.CurrentEmp.sexe);
    this.secondFormGroup = this._formBuilder.group({
      DateDebut: [this.CurrentEmp.dateDeb,Validators.required],
      DateFin:[this.CurrentEmp.dateFin,],
      Niveau:[this.CurrentEmp.niveauEtude,Validators.required],
      service :[this.CurrentEmp.service,Validators.required],
    });

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
  get DateDebut():any{
    return this.secondFormGroup.get('DateDebut');
  }
  get DateFin():any{
    return this.secondFormGroup.get('DateFin');
  }

  get Niveau():any{
    return this.secondFormGroup.get('Niveau');
  }
  get Service():any{
    return this.secondFormGroup.get('service');
  }
  get cin():any{
    return this.firstFormGroup.get('cin');
  }

  annuler(){
    this.action='show';
  }
  ///Upload file


  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

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
    this.employee.photo=this.selectedFiles.item(0).name;
    this.photo="http://localhost:8080/files/"+this.employee.photo;
    this.CurrentEmp.photo=this.employee.photo;
    this.selectedFiles = undefined;

  }
  setValue() {
    this.employee=this.CurrentEmp;
    this.employee.email = this.email.value;
    this.employee.adresse=this.adresse.value;
    this.employee.cin=this.cin.value;
    this.employee.tele=this.tele.value;
    this.employee.ville=this.ville.value;
    if(this.DateFin.value!=null){
      this.employee.dateFin=_moment(this.DateFin.value).format('YYYY-MM-DD');
    }
    if(this.DateDebut.value!=null){
      this.employee.dateDeb=_moment(this.DateDebut.value).format('YYYY-MM-DD');
    }
    if(this.Lnaissance.value!=null){
      this.employee.dateNaissance=_moment(this.Lnaissance.value).format('YYYY-MM-DD');
    }
    this.employee.nom=this.nom.value;
    this.employee.prenom=this.prenom.value;
    this.employee.niveauEtude=this.Niveau.value;
    this.employee.service=this.Service.value;
    this.employee.sexe=this.sexe.value;
  }
  update(){
    this.setValue();
    console.log(this.employee);
    this.EmpServ.modiEmployee(this.CurrentEmp.matricule,this.employee).subscribe(value => {
      localStorage.setItem('currentUser', JSON.stringify(this.employee));
      this.CurrentEmp=this.employee;
      this.openSnackBar("Modification des informations réussi","");
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
