import { Injectable } from '@angular/core';
import {stagiaire} from "../app/model/model.stagiaire";
import {map} from "rxjs/internal/operators";
import {Http} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  constructor(private http:Http) { }
  AddStagiaire(stag:stagiaire){
    return this.http.post('http://localhost:8080/stagiaire',stag).pipe(map(resp => resp.json()));
  }
  getStagiaires(id:String,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherStagiaire?mc=' + id + '&page=' + page + '&size=' + size)
      .pipe(map(resp => resp.json()));
  }
  getStagiairesByService(id:String,ser:String,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherStagiairebyService?mc=' + id + '&ser=' + ser + '&page=' + page + '&size=' + size)
      .pipe(map(resp => resp.json()));
  }

  suppStagiaire(idS:any){
    return this.http.delete('http://localhost:8080/stagiaire/'+idS).pipe(map(resp => resp.json()));
  }
  modiStagiaire(idS:number,stag:stagiaire){
    return this.http.put('http://localhost:8080/stagiaire/'+idS,stag).pipe(map(resp => resp.json()));
  }
}
