import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SecurityComponent } from "./security/security.component";
import { SignupComponent } from "./signup/signup.component";
import { HospitalDashboardComponent } from "./hospital-dashboard/hospital-dashboard.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { SavedoctorComponent } from "./doctor/savedoctor/savedoctor.component";
import { PatientComponent } from "./patient/patient.component";
import { SavepatientComponent } from "./patient/savepatient/savepatient.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { SaveappointmentComponent } from "./appointments/saveappointment/saveappointment.component";
import { TreatmentHistoryComponent } from "./treatment-history/treatment-history.component";
import { SavetreatmenthistoryComponent } from "./treatment-history/savetreatmenthistory/savetreatmenthistory.component";

const routes: Routes = [
    {
        path: 'login', component: SecurityComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'dashboard/:token/:username', component: HospitalDashboardComponent
    },
    {
        path: 'doctors/:token', component: DoctorComponent

    },
    {
        path: 'savedoctor/:token', component: SavedoctorComponent

    },
    {
        path: 'patients/:token', component: PatientComponent

    },
    {
        path: 'savepatient/:token', component: SavepatientComponent

    },
    {
        path: 'appointments/:token', component: AppointmentsComponent

    },
    {
        path: 'saveappointment/:token', component: SaveappointmentComponent

    },
    {
        path: 'treatmenthistories/:token', component: TreatmentHistoryComponent

    },
    {
        path: 'savetreatmenthistory/:token', component: SavetreatmenthistoryComponent

    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }