import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-aptitude',
  templateUrl: './aptitude.component.html',
  styleUrls: ['./aptitude.component.css']
})
export class AptitudeComponent implements OnInit {
  
  submit:boolean=true;
  type="aptitudes";
  show1:boolean;
  show2:boolean=true;
  show3:boolean;
  i:number=1;
  apt1:any;
  choice:string;
  ans:string[]=['1','2','3','4','5'];
  aptitudes:Object=[];
  link:string;
  ticks=59;
  private subscription:Subscription;
  private timer;
  limit=60;
  min=4;
  minShow=this.min;
  hr=1;
  zero1:string='0';
  zero2:string='';
  flag=0;
  n=0;
  spin=true;

  constructor(private authService:AuthService,private router:Router,private flashMessage:FlashMessagesService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.link=this.route.snapshot.params['link'];
    this.authService.getTaptitude(this.link).subscribe(aps => {
      this.aptitudes=aps;
      this.apt1=this.aptitudes[0];
      this.n=aps.length;
      this.spin=false;
      this.timer = Observable.timer(1000,1000);
      this.subscription=this.timer.subscribe(t=> {
        this.LiveTime(t);
    });
       },
    err =>{
      console.log(err);
      return false;
    });
  }

  //
  LiveTime(t) {
    if(this.flag==1) {
      this.minShow-=1;
    }

    if(this.min<10) {
      this.zero1='0';
    }
    else {
      this.zero1='';
    }

    //Solving starting 60 problem
    /*if(this.min==4 && this.ticks==0) {
      this.ticks=0;
    }
    else {
      this.ticks=this.limit-t;
    }
    */

    if((this.min==4 && this.ticks==59)) {
      this.ticks=this.limit-t-1;  
    }
    else {
      this.ticks=this.limit-t;
    }

    if(t%60==0&&t!=0) {
      this.min--;
      this.minShow=this.min-1;
      this.limit+=60;
    }
    if(this.ticks<10) {
      this.zero2='0';
    }
    else {
      this.zero2='';
    }

    if(this.ticks==0) {
      this.flag=1;
      this.minShow=this.min+1;
    }
    else {
      this.flag=0;
    }

    if(this.min==0 && this.ticks==0) {
      console.log('We are in');
      this.router.navigate(['/evaluate',{qtype:this.type,answers:this.ans,qlink:this.link,qsubmit:this.submit}]);
    }
    //this.minShow=this.min-1;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkFlag(op:number) {
    this.choice='option'+op;
    this.ans[this.i-1]=this.choice;
    if(this.i==this.n) {
      this.show3=true;
      this.show2=false;
    }
  }
  
  check() {
    if(!this.ans[this.i-1].startsWith('option')) {
      this.flashMessage.show('You have to attend each question!',{cssClass:'alert-danger',timeout:3000});
    }
    else {
    this.apt1=this.aptitudes[this.i];
    this.i=this.i+1;
    if(this.i>0) {
      this.show1=true;
      this.show2=true;
    }
    if(this.i==this.n) {
      this.show1=true;
      this.show2=false;
      //this.show3=true;
    } 
  }
  }

  count() {
    console.log('counting answers');
  }

}
