import { employee } from './../app/model/model.employee';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class EmployeeService {

  private UserUrl = "";
  constructor(public http: Http) {

  }

  getEmployes(motCle:String,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherPersonnes?mc='+motCle+'&page='+page+'&size='+size)
      .pipe(map(resp => resp.json()));
  }
  getEmployesService(service:String,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherParService?service='+service+'&page='+page+'&size='+size)
      .pipe(map(resp => resp.json()));
  }


  getAllStatisticsByYearss() {
    console.log("i'm here2");
    return this.http.get('http://localhost:8080/getAllListStaticsByYears')
      .pipe(

        tap(resp =>  this.log('Statistics '))
      );
  }

  getAllStatisticsByYears(){
    console.log("i'm year 1");
    let headerParam= new HttpHeaders({'Content-Type': 'application/json','Authorization':'NomPrefix'})
    return this.http.post("http://localhost:8080/getAllListStaticsByYears",null)
      .pipe(

        tap(resp =>  this.log('Statistics '))
      );

  }



  getAllStatisticsByMonthAndYears(years:number){
    console.log("hi fati Deuxieme");
    return this.http.post(this.UserUrl+"http://localhost:8080/getAllListStaticsByYearsAndMonth?years="+years,null)
      .pipe(

        tap(resp =>  this.log('Statistics '))
      );


  }

  getAllStatisticsByMonthAndYearss(years:number) {

    console.log(years);
    return this.http.get('http://localhost:8080/getAllListStaticsByYearsAndMonth?years='+years)
      .pipe(map(resp => resp.json()));

  }


  saveEmployes(employee:employee){
    return this.http.post('http://localhost:8080/personne',employee).pipe(map(resp => resp.json()));

  }
  suppEmployee(Matricule:any){
    return this.http.delete('http://localhost:8080/personne/'+Matricule).pipe(map(resp => resp.json()));
  }
  modiEmployee(mat:number,employee:employee){
    return this.http.put('http://localhost:8080/personne/'+mat,employee).pipe(map(resp => resp.json()));
  }

  private log(message: string) {
    // this.messages=[];
    // this.messages.push(message);
    // console.log("Log is :" + message);
    // this.messageService.add(`HeroService: ${message}`);

  }

}
