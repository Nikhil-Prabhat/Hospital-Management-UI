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
import { PatientComponent } from './patient/patient.component';
import { SavepatientComponent } from './patient/savepatient/savepatient.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SaveappointmentComponent } from './appointments/saveappointment/saveappointment.component';
import { TreatmentHistoryComponent } from './treatment-history/treatment-history.component';
import { MaintainspacePipe } from './pipes/maintainspace.pipe';
import { SavetreatmenthistoryComponent } from './treatment-history/savetreatmenthistory/savetreatmenthistory.component';
import { BillComponent } from './bill/bill.component';
import { SavebillComponent } from './bill/savebill/savebill.component';

@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    SignupComponent,
    HospitalDashboardComponent,
    DoctorComponent,
    SavedoctorComponent,
    PatientComponent,
    SavepatientComponent,
    AppointmentsComponent,
    SaveappointmentComponent,
    TreatmentHistoryComponent,
    MaintainspacePipe,
    SavetreatmenthistoryComponent,
    BillComponent,
    SavebillComponent
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
