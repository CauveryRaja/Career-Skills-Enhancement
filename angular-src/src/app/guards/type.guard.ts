import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TypeGuard implements CanActivate {

user:Users;
    
    constructor(private authService:AuthService,private router:Router) {}

    canActivate() {
        if(this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    isStudent() {
        this.authService.getProfile().subscribe(profile => {
            this.user=profile.user;
            //this.send=this.user.email;
            //this.email+=this.user.email.split('.')[0]+".jpeg";
          },
          err =>{
            console.log(err);
            return false;
          });

        if(this.user.type.endsWith('student')) {
            return true;
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