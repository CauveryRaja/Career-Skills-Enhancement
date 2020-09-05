import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lgmenu',
  templateUrl: './lgmenu.component.html',
  styleUrls: ['./lgmenu.component.css']
})
export class LgmenuComponent implements OnInit {

  link1:any='dashboard/logic/number';
  link2:any='dashboard/logic/string';
  link3:any='dashboard/logic/array';
  link4:any='dashboard/logic/pattern';
  
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

}