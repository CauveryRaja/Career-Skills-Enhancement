import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tapmenu',
  templateUrl: './tapmenu.component.html',
  styleUrls: ['./tapmenu.component.css']
})
export class TapmenuComponent implements OnInit {

  link1:any='dashboard/taptitude/Java';
  link2:any='dashboard/taptitude/C++';
  link3:any='dashboard/taptitude/C';
  link4:any='dashboard/taptitude/Datastructures';
  
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

}
