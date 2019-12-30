import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import { map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  constructor(public http: Http,private router:Router) { }

  public logIn(username: String){


    return this.http.get("http://localhost:8080/chercherParUsername?username="+username)
      .pipe(map(res => {
        return (<any>res)._body === '' ? {} : res.json();
      }))


  }

  show(){
    console.log( localStorage.getItem('currentUser'));
  }
  logOut() {
    // remove user from local storage to log user out
this.show();
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
