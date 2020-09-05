import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  greeting=true;
  submit:string;
  show1:boolean;
  show2:boolean;
  show3:boolean;
  i:number=1;
  count:number=0;
  colors:coloropt[];
  col:coloropt;
  color:coloropt={
    option1:'',
    option2:'',
    option3:'',
    option4:''
  };
  type:string;
  answers:string[];
  aptitudes:Aps[];
  apt1:Aps;
  loop:Aps;
  link:string;
  test:string[]=['option1','option2','option3'];
  curoption:string=this.color[this.test[2]];

  //Variables for posting scores
  user:User;
  //email:string='ram@gmail.com';
  qtype:string;
  date:string='1 Nov 2017 7:30PM ';
  correct=0;
  wrong=0;
  now:Date=new Date();
  currdate=this.now.toString().substring(0,21);
  spin=true;
  ans:string;
  n=0;
  
  constructor(private authService:AuthService,private router:Router,private flashMessage:FlashMessagesService,
    private route:ActivatedRoute,private validateService : ValidateService) { }

  ngOnInit() {
    this.flashMessage.show('You have completed the test but you have to submit to save it...',{cssClass:'alert-info',timeout:5000});
    this.answers=this.route.snapshot.params['answers'].split(',');
    this.link=this.route.snapshot.params['qlink'];
    this.type=this.route.snapshot.params['qtype'];
    this.submit=this.route.snapshot.params['qsubmit'];
    
    //getting user data
    this.authService.getProfile().subscribe(profile => {
      this.user=profile.user;
    },
    err =>{
      console.log(err);
      return false;
    });
    
    //getting aptitude
    
  //getting technical aptitude
    if(this.type.endsWith('taptitudes')) {
      this.authService.getTaptitude(this.link).subscribe(aps => {
        this.aptitudes=aps;
        this.apt1=this.aptitudes[0];
        this.qtype=this.apt1.type;
        this.spin=false;
        this.ans=this.answers[0];
        this.n=aps.length;
        console.log(this.n);
        if(this.n>1&&this.submit.endsWith('true')) {
          this.show2=true;
        }
        else if(this.n==1&&this.submit.endsWith('true')) {
          this.show3=true;
        }
        else if(this.n>1&&this.submit.endsWith('false')) {
          this.show2=true;
        }
        console.log(this.ans);
        console.log(this.apt1.answer);
        console.log(this.ans.endsWith(this.apt1.answer));
        console.log(this.answers);
        if(this.ans.endsWith(this.apt1.answer)) {
          this.color[this.apt1.answer]='bg-success';
          console.log('we are in');
          this.correct+=1;
        }
        else {
          this.color[this.apt1.answer]='bg-success';
          this.color[this.ans]='bg-danger';
          this.wrong+=1;;
        }
    },
    err =>{
      console.log(err);
      return false;
    });

  }
  else if(this.type.endsWith('aptitudes')) {
    this.authService.getAptitude(this.link).subscribe(aps => {
      this.aptitudes=aps;
      this.apt1=this.aptitudes[0];
      this.qtype=this.apt1.type;
      this.spin=false;
      this.ans=this.answers[0];
      this.n=aps.length;
      if(this.n>1&&this.submit.endsWith('true')) {
        this.show2=true;
      }
      else if(this.n==1&&this.submit.endsWith('true')) {
        this.show3=true;
      }
      else if(this.n>1&&this.submit.endsWith('false')) {
        this.show2=true;
      }
      console.log(this.ans);
      console.log(this.apt1.answer);
      console.log(this.ans.endsWith(this.apt1.answer));
      console.log(this.answers);
      if(this.ans.endsWith(this.apt1.answer)) {
        this.color[this.apt1.answer]='bg-success';
        console.log('we are in');
        this.correct+=1;
      }
      else {
        this.color[this.apt1.answer]='bg-success';
        this.color[this.ans]='bg-danger';
        this.wrong+=1;
      }
  },
  err =>{
    console.log(err);
    return false;
  });

}
  
}
  
//next
check() {
  this.color = {
    option1:'',
    option2:'',
    option3:'',
    option4:''
  };
  this.apt1=this.aptitudes[this.i];
  this.ans=this.answers[this.i];
  console.log(this.ans);
  console.log(this.apt1.answer);
  console.log(this.ans.endsWith(this.apt1.answer));
  console.log(this.answers);
  if(this.ans.endsWith(this.apt1.answer)) {
    this.color[this.apt1.answer]='bg-success';
    console.log('we are in');
    this.correct+=1;
  }
  else {
    console.log(this.color[this.ans]);
    this.color[this.apt1.answer]='bg-success';
    this.color[this.ans]='bg-danger';
    console.log(this.color[this.ans]);
    this.wrong+=1;
  } 
  this.i=this.i+1;
  if(this.i>0) {
    if(this.submit.endsWith('false')) {
      this.show1=true;
    }
    this.show2=true;
  }
  if(this.i>=this.n) {
    if(this.submit.endsWith('false')) {
      this.show1=true;
    }
    this.show2=false;
    if(this.submit.endsWith('true')) {
      this.show3=true;
    }
  }
  
}

//previous
checkPre() {
  this.color = {
    option1:'',
    option2:'',
    option3:'',
    option4:''
  };
  /*if(this.i==2) {
    this.i=this.i-1;
    this.apt1=this.aptitudes[this.i-1];
    if(this.answers[this.i]==this.apt1.answer) {
      this.color[this.apt1.answer]='bg-success';
    }
    else {
      this.color[this.apt1.answer]='bg-success';
      this.color[this.answers[this.i]]='bg-danger';
    } 
    this.show2=true;
    this.show3=false;
  }
  else*/ if(this.i>1) {
    this.i=this.i-1;
    this.apt1=this.aptitudes[this.i-1];
    if(this.answers[this.i-1]==this.apt1.answer) {
      this.color[this.apt1.answer]='bg-success';
    }
    else {
      this.color[this.apt1.answer]='bg-success';
      this.color[this.answers[this.i-1]]='bg-danger';
    } 
    this.show2=true;
    this.show3=false;
  }
  if(this.i==1) {
    this.show1=false;
  }
}



onTestSubmit() {
  console.log(this.submit);
  if(this.submit.endsWith('true')) {
  console.log(this.user.email+"and"+this.answers+""+this.submit);
  const score = {
    email:this.user.email,
    type:this.qtype,
    date:this.currdate,
    answers:this.answers,
    correct:this.correct+"",
    wrong:this.wrong+""
  }
  console.log(score);
  this.authService.postScore(score).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('You have submitted successfully',{cssClass:'alert-success',timeout:3000});
      this.router.navigate(['/result',{email:this.user.email}]);
    }
    else {
      this.flashMessage.show('please try again',{cssClass:'alert-danger',timeout:3000});
      //this.router.navigate(['/register']);
    }
  });
}
else {
  console.log('Received Submit false');
  this.router.navigate(['/result',{email:this.user.email}]);
}
}

}

interface User {
  name:string,
  username:string,
  type:string,
  email:string,
  password:string
}

interface coloropt {
  option1:string,
  option2:string,
  option3:string,
  option4:string
}

interface Aps {
  question:string,
  type:string,
  option1:string,
  option2:string,
  option3:string,
  option4:string,
  answer:string,
  solution:string
}