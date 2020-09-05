import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apmenu',
  templateUrl: './apmenu.component.html',
  styleUrls: ['./apmenu.component.css']
})
export class ApmenuComponent implements OnInit {

  link1:any='dashboard/aptitude/number';
  link2:any='dashboard/aptitude/ratio';
  link3:any='dashboard/aptitude/percentage';
  link4:any='dashboard/aptitude/sum';
  
  constructor(private authService:AuthService,private router:Router) { }


  ngOnInit() {
  }

}
