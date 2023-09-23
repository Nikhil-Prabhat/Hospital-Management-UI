import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SecurityComponent } from './security/security.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SecurityServiceService } from './service/security-service.service';
import { SignupComponent } from './signup/signup.component';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HospitalService } from './service/hospital.service';
import { SavedoctorComponent } from './doctor/savedoctor/savedoctor.component';

@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    SignupComponent,
    HospitalDashboardComponent,
    DoctorComponent,
    SavedoctorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [SecurityServiceService, HospitalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
