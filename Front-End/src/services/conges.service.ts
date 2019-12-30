import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {conge} from '../app/model/model.conge';
import {map} from 'rxjs/operators';
import {employee} from '../app/model/model.employee';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgProgress} from '@ngx-progressbar/core';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  constructor(public http: Http,public httpclient:HttpClient,private progress:NgProgress) { }
  AddConge(cong:conge){
     this.http.post('http://localhost:8080/conge',cong).pipe(map(resp => resp.json())).subscribe(value => {
console.log(value);
     });
  }
  GetConges(){
    return this.http.get('http://localhost:8080/Conges').pipe(map(resp => resp.json()));
  }

  GetCongesByID(id:number,page:number,size:number) {
    return this.http.get('http://localhost:8080/CongesByPersonne?id=' + id + '&page=' + page + '&size=' + size)
      .pipe(map(resp =>resp.json()));
  }

  suppConge(id:any){
    return this.http.delete('http://localhost:8080/conge/'+id).pipe(map(resp => resp.json())).subscribe(value => {

      console.log(value);

    }, error1 => console.log(error1));
  }
  modiConge(id:number,cong:conge){
    console.log(cong);
    return this.http.put('http://localhost:8080/conge/'+id,cong).pipe(map(resp => resp.json()));
  }
  verifieConge(date:string,service:string){
    return this.http.get('http://localhost:8080/VerfieConge?date='+date+'&service='+service).pipe(map(resp => resp.json()));
  }
  public getJSON(): Observable<any> {
    return this.http.get("./assets/jourFerier.json")
      .pipe(map(resp => resp.json()));

  }

/*
  search(id:number,page:number,size:number) {
    let promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/CongesByPersonne?id=' + id + '&page=' + page + '&size=' + size)
        .toPromise()
        .then(
          res => { // Success
            this.results = res.json().results;
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
  */
}
