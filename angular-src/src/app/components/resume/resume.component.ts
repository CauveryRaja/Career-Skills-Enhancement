import { Component, OnInit } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import {ImageService} from '../../services/image.service';
import { ActivatedRoute,Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  resLink='result/resume/';
  link='users/upload/user';
  fileToUpload:File;
  response:any;
  imgname='logo-VVDN.jpeg';
  flag:string;
  display='none';
  showin='none';
  showin2='none';
  profile:Resumes;
  email:string;
  read:string;
  update:string;
  lists:string[];
  tips:string;
  spin=true;
  greetings={
    "objective":"This shows who you are",
    "interests":"This shows who you wanna become",
    "projects":"Explain your works like softwares,websites,mobile app,games and animations",
    "co_curr":"Showcase your achievements in paper, project presentations and other competition",
    "extra_curr":"Showcase your unique skills and sports achievements",
    "strengths":"Your major plus",
    "hobbies":"Your pass time"
  };
  saved:string="none";
  arr:string[];
  image:string='\assets\\uploads\\user\\photo-';

  constructor(private authService:AuthService,private http: Http,private route:ActivatedRoute,
              private imageService:ImageService,private flashmessage:FlashMessagesService) {}
  
    ngOnInit() {
      this.flashmessage.show('Once you have updated the resume,you have to submit to save it...',{cssClass:'alert-info',timeout:5000});      
      this.email=this.route.snapshot.params['email'];
      this.resLink+=this.email;
      this.image+=this.email.split('.')[0]+".jpeg";
      this.authService.getResume(this.resLink).subscribe(profile => {
        this.profile=profile;
        this.spin=false;
        console.log(this.profile+":"+this.image);
      },
      err =>{
        console.log(err);
        return false;
      });
    }


    openModal(entry:string){
         this.display='block';
         if(entry.startsWith('name') || entry.startsWith('email') || entry.startsWith('objective')) {
            this.inputs(entry);
         }
         else if(entry.startsWith('interests') || entry.startsWith('co_curr') || entry.startsWith('extra_curr')) {
            this.listItems(entry);
         }
    }
    
    inputs(entry) {
      this.showin='block';
      console.log("func 1:",entry+this.showin);
      this.tips=this.greetings[entry];
      this.read=entry;
      this.update=this.profile[entry];
      console.log(this.profile[entry]);
    }

    listItems(entry) {
      this.showin2='block';
      console.log("func 2:",entry+this.showin);
      this.read=entry;
      this.update=this.profile[entry];
      this.tips=this.greetings[entry];
      this.lists=this.profile[entry];
      console.log(this.greetings[entry]);
    }

    save(input) {
      this.saved="green";
      this.profile[this.read].push(input);
      //this.listItems(this.read);
      this.saved="none";
    }

    save1(input) {
      this.saved="green";
      this.profile[this.read]=input;
      this.saved="none";
      //this.listItems(this.read);
    }

    delete(out) {
      this.arr=this.profile[this.read];
      console.log("arr:",this.arr);
      for(let i=0;i<this.arr.length;i++) {
        if(this.arr[i]==out)
          {
            this.arr.splice(i,1);
          }
      }
      this.profile[this.read]=this.arr;
      //this.listItems(this.read);
    }

    onCloseHandled(){  
          this.display='none';
          this.showin='none'; 
          this.showin2='none';
    }

    submit() {
      this.authService.updateResume(this.resLink,this.profile).subscribe(data => {
        if(data.success) {
          this.flashmessage.show('Your resume has been updated,carry on... ',{
            cssClass:'alert-success',
            timeout:3000
          });
        }
        else {
          this.flashmessage.show('Try again,your resume has not been updated',{
            cssClass:'alert-danger',
            timeout:3000
          });
        }
      });
    }
      
    fileChangeEvent(event) {
      this.imageService.upload(event,this.link,'photo').subscribe(result => {
        console.log("profile:",result);
        if(result.success) {
          this.flashmessage.show('Your resume pic has been updated,carry on... ',{
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

interface Resumes {
  name:string,
  email:string,
  objective:string,
  marks: { 
    tenth:string,
    twelth:string,
    college:string
  },
  interests:string[],
  projects:string[],
  co_curr:string[],
  extra_curr:string[],
  strengths:string[],
  hobbies:string[]
}