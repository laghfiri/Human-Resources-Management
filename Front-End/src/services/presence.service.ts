import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {presence} from "../app/model/model.presence";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private http:Http) { }
  AddPresence(prese:presence){
    return this.http.post('http://localhost:8080/presence',prese).pipe(map(resp => resp.json()));
  }
  MultiAdd(prese:presence){
    return this.http.post('http://localhost:8080/presence',prese).pipe(map(resp => resp.json())).toPromise();
  }
  getPresences(page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherPresences?page=' + page + '&size=' + size)
      .pipe(map(resp => resp.json()));
  }
  getPresencesEmp(dateP:String,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherPresencesEmp?date=' + dateP + '&page=' + page + '&size=' + size)
      .pipe(map(resp => resp.json()));
  }
  getPresencesEmpByDate(mat:number,dateP:String,page:number,size:number) {
    return this.http.get('http://localhost:8080//chercherPresencesEmpbyMat?mat='+ mat +'&date=' + dateP + '&page=' + page + '&size=' + size)
      .pipe(map(resp => resp.json()));
  }
  getPresencesEmpByDateAndMatricule(mat:number,dateP:String,page:number,size:number) {
    return this.http.get('http://localhost:8080//chercherPresencesEmpbyMatAndDate?mat='+ mat +'&date=' + dateP + '&page=' + page + '&size=' + size)
      .pipe(map(resp => resp.json()));
  }
  suppPresence(Matricule:any){
    return this.http.delete('http://localhost:8080/presence/'+Matricule).pipe(map(resp => resp.json()));
  }
  modiPresence(mat:number,prese:presence){
    return this.http.put('http://localhost:8080/presence/'+mat,prese).pipe(map(resp => resp.json()));
  }
  public GenerateAbsence(date:string){
    return this.http.get("http://localhost:8080/generateAbsence?date="+date);
  }
  public getAbsence(id:number){
    return this.http.get("http://localhost:8080//getAbsence?id="+id).pipe(map(resp=>resp.json()));
  }
  public VerifieAbsence(date:string){
    return this.http.get("http://localhost:8080/verfieAbsenceDate?date="+date);
  }
  public AbsenceToday(date:string){
    return this.http.get("http://localhost:8080/AbsenceToday?date="+date).pipe(map((resp:any)=>resp.json()));
  }
}
