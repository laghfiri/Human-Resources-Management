import { Injectable } from '@angular/core';
import {visiteur} from "../app/model/model.visiteur";
import {map} from "rxjs/internal/operators";
import {Http} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class VisiteurService {

  constructor(private http:Http) { }
  AddVisiteur(visit:visiteur){
    return this.http.post('http://localhost:8080/visiteur',visit).pipe(map(resp => resp.json()));

  }
  getVisiteurs(id:String,page:number,size:number) {
    return this.http.get('http://localhost:8080/chercherVisiteurs?mc=' + id + '&page=' + page + '&size=' + size)
      .pipe(map(resp => resp.json()));
  }
  suppVisiteur(Matricule:any){
    return this.http.delete('http://localhost:8080/visiteur/'+Matricule).pipe(map(resp => resp.json()));
  }
  modivisiteur(mat:number,visit:visiteur){
    return this.http.put('http://localhost:8080/visiteur/'+mat,visit).pipe(map(resp => resp.json()));
  }
}
