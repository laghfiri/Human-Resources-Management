import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {map} from "rxjs/internal/operators";
import {messagerie} from "../app/model/model.messagerie";

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  constructor(public http:Http) { }
  notification(idE:number){
      return this.http.get('http://localhost:8080/ReturnLu?idE='+idE)
        .pipe(map(resp => resp.json()));

  }
  getMessages(motCle:String,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherPersonnes?mc='+motCle+'&page='+page+'&size='+size)
      .pipe(map(resp => resp.json()));
  }
  getMessagesByIdE(idE:number,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherEmailsByIdE?idE='+idE+'&page='+page+'&size='+size)
      .pipe(map(resp => resp.json()));
  }
  getMessagesByIdR(idR:number,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherEmailsByIdR?idR='+idR+'&page='+page+'&size='+size)
      .pipe(map(resp => resp.json()));
  }
  getMessagesSupprim(idE:number,idR:number,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherEmailsBySuppr?idE='+idE+'&idR='+idR+'&page='+page+'&size='+size)
      .pipe(map(resp => resp.json()));
  }
  getMessagesByIdM(idM:number,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherEmailsByIdM?idM='+idM+'&page='+page+'&size='+size)
      .pipe(map(resp => resp.json()));
  }
  saveMessage(msg:messagerie){
    return this.http.post('http://localhost:8080/email',msg).pipe(map(resp => resp.json()));

  }
  suppMsg(idM:any){
    return this.http.delete('http://localhost:8080/email/'+idM).pipe(map(resp => resp.json()));
  }
  modiMessage(idM:number,msg:messagerie){
    return this.http.put('http://localhost:8080/email/'+idM,msg).pipe(map(resp => resp.json()));
  }
}
