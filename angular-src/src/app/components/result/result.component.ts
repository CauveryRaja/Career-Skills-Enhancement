import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  model = 'some text';
  model2 = 2533;
  i:number;
  answers:string[];
  qlink:string;
  type:string='taptitudes';
  email:string='empty';
  user:User;
  scores:Score[];
  link:string;
  spin=true;
  //newlink:string='http://localhost:3000/result/score/rahul@gmail.com';
  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    //getting user data
    this.email=this.route.snapshot.params['email'];
    if(this.email==undefined) {
        this.authService.getProfile().subscribe(profile => {
        this.user=profile.user;
        this.email=this.user.email;
        this.link='result/score/'+this.email;
        console.log(this.email);
        this.call(this.link);
      },
      err =>{
        console.log(err);
        return false;
      });
    }
    else {
      this.link='result/score/'+this.email;
      this.call(this.link);
    }
  }
    call(links) {
    //getting aptitude
    this.authService.getScore(links).subscribe(score => {
      console.log('Getting scores');
      this.scores=score;
      this.spin=false;
      console.log(this.scores);
    },
    err =>{
      console.log(err);
      return false;
    });
  }

  check(n:number) {
    this.i=n;
    console.log('Sending again to evaluate:',this.i);
    if(this.scores[this.i].type.endsWith('Java') || this.scores[this.i].type.endsWith('C++') || 
      this.scores[this.i].type.endsWith('C') || this.scores[this.i].type.endsWith('Datastructures')) {
        this.type='taptitudes';
        this.qlink='dashboard/taptitude/'+this.scores[this.i].type;
      }
    else if(this.scores[this.i].type.endsWith('number') || this.scores[this.i].type.endsWith('ratio') || 
      this.scores[this.i].type.endsWith('percentage') || this.scores[this.i].type.endsWith('sum')) {
        this.type='aptitudes';
        this.qlink='dashboard/aptitude/'+this.scores[this.i].type;
      }
    this.answers=this.scores[this.i].answers;
    this.router.navigate(['/evaluate',{qtype:this.type,answers:this.answers,qlink:this.qlink,qsubmit:false}]);
  }

}

interface User {
  name:string,
  username:string,
  type:string,
  email:string,
  password:string
}

interface Score {
  email:string,
  type:string,
  date:string,
  answers:string[],
  correct:string,
  wrong:string
}