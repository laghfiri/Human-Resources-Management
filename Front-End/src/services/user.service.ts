import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { employee } from './../app/model/model.employee';
import * as XLSX from 'xlsx';

import {map} from 'rxjs/operators';
import {headersToString} from '../../node_modules/@types/selenium-webdriver/http';
import {VariableGlobale} from "./VariableGlobale";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserUrl = "";
  messages: string[] = [];


  constructor(private http:HttpClient,private  variableGloabal:VariableGlobale) {
    this.UserUrl=this.variableGloabal.url;
  }


  getAllStatisticsByYears(){
    let headerParam= new HttpHeaders({'Content-Type': 'application/json','Authorization':'NomPrefix'})
    return this.http.post(this.UserUrl+"getAllListStaticsByYears",null,{headers:headerParam})
      .pipe(

        tap((employee:employee) => this.log('Statistics ')),
        catchError(this.handleError<employee>('All Statistics ............'))
      );
  }

  /*
   * Statics....
   */
  getAllStatisticsByMonthAndYears(years:number){
    let headerParam= new HttpHeaders({'Content-Type': 'application/json','Authorization':'NomPrefix'})
    return this.http.post(this.UserUrl+"getAllListStaticsByYearsAndMonth?years="+years,null,{headers:headerParam})
      .pipe(
        tap((employee:employee) => this.log('Statistics ')),
        catchError(this.handleError<employee>('All Statistics ............'))
      );
  }





  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //  console.log(error.message); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.error}`);
      //this.log(`${error.error}`);


      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

  private log(message: string) {
   // this.messages=[];
   // this.messages.push(message);
   // console.log("Log is :" + message);
    // this.messageService.add(`HeroService: ${message}`);

  }

















}
