import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.css']
})
export class LogicComponent implements OnInit {

  logics:Object=[];
  link:string;
  spin=true;

  constructor(private authService:AuthService,private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.link=this.route.snapshot.params['link'];
    this.authService.getLogic(this.link).subscribe(logics => {
      this.logics=logics;
      this.spin=false;
    },
    err =>{
      console.log(err);
      return false;
    });
  }

}
