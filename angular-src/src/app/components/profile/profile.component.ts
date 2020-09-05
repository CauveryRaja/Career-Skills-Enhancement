import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ImageService} from '../../services/image.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  dim='show';
  spin:boolean=true;
  send:string;
  flag:any;
  callback:Function;
  user:Users;
  email:string='\assets\\uploads\\user\\photo-';
  link='users/upload/user';
  constructor(private authService:AuthService,private router:Router,
              private imageService:ImageService,private flashmessage:FlashMessagesService) { }

  ngOnInit() {
    //this.callback=obj=>this.imageService.upload(obj);
    this.authService.getProfile().subscribe(profile => {
      this.spin=false;
      this.user=profile.user;
      this.send=this.user.email;
      this.email+=this.user.email.split('.')[0]+".jpeg";
    },
    err =>{
      console.log(err);
      return false;
    });
  }

  fileChangeEvent(event) {
    //this.email=null;
    //this.flag=this.imageService.upload(event,this.link,'photo').unsubscribe();
      this.imageService.upload(event,this.link,'photo').subscribe(result => {
      console.log("profile:",result);
      if(result.success) {
        this.flashmessage.show('Your profile pic has been updated,carry on... ',{
          cssClass:'alert-success',
          timeout:3000
        });
      }
      else {
        this.flashmessage.show('Invalid file type,it should be an image in jpeg format',{
          cssClass:'alert-danger',
          timeout:3000
        });
      }
    },
    err =>{
      console.log(err);
      return false;
    });
    
  }

}
interface Users {
  name:string,
  email:string,
  type:string,
  username:string,
  password:string
}
