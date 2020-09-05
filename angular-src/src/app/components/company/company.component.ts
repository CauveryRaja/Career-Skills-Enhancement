import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import {ImageService} from '../../services/image.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  spin=true;
  link:string='home/company/';
  uplink:string='home/upload/company/';
  company:Company;
  companies:Company;
  cmpname:string;
  golink:any;
  web:string;
  flag:string;
  imglink:string='\assets\\uploads\\company\\logo-';

  constructor(private authService:AuthService,private router:Router,
                private route:ActivatedRoute,private imageService:ImageService,
                private flashmessage:FlashMessagesService) { }
  
    ngOnInit() {
      this.cmpname=this.route.snapshot.params['cname'];
      this.link+=this.cmpname;
      this.imglink+=this.cmpname+'.png';
      this.authService.getCompany(this.link).subscribe(cmp => {
        console.log('Getting company from',this.link);
        this.companies=cmp;
        this.company=this.companies[0];
        this.web=this.company.link;
        console.log(this.company);
        this.spin=false;
      },
      err =>{
        console.log(err);
        return false;
      });
    }

    go() {
      this.golink=this.company.link;
      this.router.navigate(this.golink);
   }  

   fileChangeEvent(event) {
    this.spin=true;
    this.imageService.upload(event,this.uplink,'logo').subscribe(result => {
      this.spin=false;
      console.log("profile:",result);
      if(result.success) {
        this.flashmessage.show('The company logo has been uploaded successfully,carry on... ',{
          cssClass:'alert-success',
          timeout:3000
        });
      }
      else {
        this.flashmessage.show('Invalid file type,it should be an image in png format',{
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
  
  interface Company {
      name:string,
      base:string,
      logo:string,
      rounds:string[],
      count:string,
      salary:string,
      link:string,
      date:string
  }