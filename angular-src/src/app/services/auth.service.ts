import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  users:Users;
  authtoken : any;
  user:any;
  constructor(private http:Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
    .map(res => res.json()); 
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
    .map(res => res.json()); 
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
    .map(res => res.json());   
  }

  getLogic(link) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get(link,{headers:headers})
    .map(res => res.json());   
  }

  getAptitude(link) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get(link,{headers:headers})
    .map(res => res.json());   
  }

  getTaptitude(link) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get(link,{headers:headers})
    .map(res => res.json());   
  }

  //Posting score details
  postScore(score) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('result/score',score,{headers:headers})
    .map(res => res.json()); 
  }

  //Getting score details
  getScore(link) {
    console.log('Getting scores fron authService'+link);
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get(link,{headers:headers})
    .map(res => res.json());   
  }

  postCompany(company) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('home/company',company,{headers:headers})
    .map(res => res.json()); 
  }

  //Getting score details
  getCompany(link) {
    console.log('Getting companies fron authService'+link);
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get(link,{headers:headers})
    .map(res => res.json());   
  }


  //Posting resume details
  postResume(resume) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('result/resume',resume,{headers:headers})
    .map(res => res.json()); 
  }

  //Getting score details
  getResume(link) {
    console.log('Getting scores fron authService'+link);
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get(link,{headers:headers})
    .map(res => res.json());   
  }

  //Posting resume details
  updateResume(link,resume) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put(link,resume,{headers:headers})
    .map(res => res.json()); 
  }

  storeUserData(token,user) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authtoken=token;
    this.user=user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authtoken=token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authtoken=null;
    this.user=null;
    localStorage.clear();
  }

  isStudent() {
    if(this.loggedIn()) {
      this.getProfile().subscribe(profile => {
          this.users=profile.user;
          //this.send=this.user.email;
          //this.email+=this.user.email.split('.')[0]+".jpeg";
        },
        err =>{
          console.log(err);
          return false;
        });

      if(this.users.type.endsWith('student')) {
          return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }


  isFaculty() {
  if(this.loggedIn()) {
    this.getProfile().subscribe(profile => {
        this.users=profile.user;
        //this.send=this.user.email;
        //this.email+=this.user.email.split('.')[0]+".jpeg";
      },
      err =>{
        console.log(err);
        return false;
      });

    if(this.users.type.endsWith('faculty')) {
        return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
}

interface Users {
name:string,
email:string,
type:string,
username:string,
password:string
}
