import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogicComponent } from './components/logic/logic.component';
import { LgmenuComponent } from './components/lgmenu/lgmenu.component';
import { ApmenuComponent } from './components/apmenu/apmenu.component';
import { AptitudeComponent } from './components/aptitude/aptitude.component';
import { TapmenuComponent } from './components/tapmenu/tapmenu.component';
import { TaptitudeComponent } from './components/taptitude/taptitude.component';
import { EvaluateComponent } from './components/evaluate/evaluate.component';
import { ResultComponent } from './components/result/result.component';
import { CpmenuComponent } from './components/cpmenu/cpmenu.component';
import { CompanyComponent } from './components/company/company.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ReportComponent } from './components/report/report.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import {ImageService} from './services/image.service';
import { AuthGuard } from './guards/auth.guard';



const appRoutes: Routes=[
  {path:'', component:HomeComponent },
  {path:'register', component:RegisterComponent },
  {path:'login', component:LoginComponent },
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] },
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard] },
  {path:'logic', component:LogicComponent, canActivate:[AuthGuard] },
  {path:'lgmenu', component:LgmenuComponent, canActivate:[AuthGuard] },
  {path:'apmenu', component:ApmenuComponent, canActivate:[AuthGuard] },
  {path:'aptitude', component:AptitudeComponent, canActivate:[AuthGuard] },
  {path:'tapmenu', component:TapmenuComponent, canActivate:[AuthGuard] },
  {path:'taptitude', component:TaptitudeComponent, canActivate:[AuthGuard] },
  {path:'evaluate', component:EvaluateComponent, canActivate:[AuthGuard] },
  {path:'result', component:ResultComponent, canActivate:[AuthGuard] },
  {path:'cpmenu', component:CpmenuComponent, canActivate:[AuthGuard] },
  {path:'company', component:CompanyComponent, canActivate:[AuthGuard] },
  {path:'resume', component:ResumeComponent, canActivate:[AuthGuard] },
  {path:'report', component:ReportComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    LogicComponent,
    LgmenuComponent,
    ApmenuComponent,
    AptitudeComponent,
    TapmenuComponent,
    TaptitudeComponent,
    EvaluateComponent,
    ResultComponent,
    CpmenuComponent,
    CompanyComponent,
    ResumeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService,ImageService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
