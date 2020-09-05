import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-cpmenu',
  templateUrl: './cpmenu.component.html',
  styleUrls: ['./cpmenu.component.css']
})
export class CpmenuComponent implements OnInit {

spin=true;
link:string='home/company/';
companies:Company[];
cmp:string;
cname='Vuram';

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.authService.getCompany(this.link).subscribe(cmp => {
      console.log('Getting companies');
      this.companies=cmp;
      this.spin=false;
      console.log(this.companies);
    },
    err =>{
      console.log(err);
      return false;
    });
  }

  show(n:number) {
    this.cmp=this.companies[n].name;
    console.log(this.cmp);
    this.router.navigate(['/company',{cname:this.cmp}]);
  }

}

interface Company {
    name:string,
    base:string,
    logo:string,
    rounds:string,
    count:string,
    salary:string,
    link:string,
    date:string
}