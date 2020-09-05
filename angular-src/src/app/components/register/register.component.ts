import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  resLink='result/resume/';
  name:String;
  username:String;
  email:String;
  password:String;
  type:String;
  spin=false;

  constructor(
    private validateService : ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.resLink+=this.email;
  }

  onRegisterSubmit() {
    this.spin=true;
    console.log(this.name);
    const user = {
      name:this.name,
      username:this.username,
      type:this.type,
      email:this.email,
      password:this.password
    }
    console.log(user);
    
    const resume = {
      name:this.name,
      email:this.email,
      objective:'Click here to add objective',
      marks : {
          tenth :'Click here to add tenth',
          twelth :'Click here to add twelth',
          college : 'Click here to add college'
      },
      interests:'Click here to add interests',
      projects:'Click here to add projects',
      co_curr:'Click here to add co-curricular activities',
      extra_curr:'Click here to add extra-curricular activities',
      strengths:'Click here to add strengths',
      hobbies:'Click here to add hobbies'
    }

    //Require fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields',{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    //Require valid Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter valid email',{cssClass:'alert-danger',timeout:3000});
      return false;
    }    

    //Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('You are now registered successfully and can log in',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessage.show('Log in unsuccessful , please try again',{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    });

    //Register resume
    this.authService.postResume(resume).subscribe(data => {
      if(data.success) {
        console.log(data);
      }
    });
  }

  check(type:string) {
    this.type=type;
  }
}
