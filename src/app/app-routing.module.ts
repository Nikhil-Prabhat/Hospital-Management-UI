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
import { BillComponent } from "./bill/bill.component";
import { SavebillComponent } from "./bill/savebill/savebill.component";
import { InsuranceComponent } from "./insurance/insurance.component";

const routes: Routes = [
    {
        path: 'login', component: SecurityComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'dashboard/:token/:username/:role', component: HospitalDashboardComponent
    },
    {
        path: 'doctors/:token/:role', component: DoctorComponent

    },
    {
        path: 'savedoctor/:token/:role', component: SavedoctorComponent

    },
    {
        path: 'patients/:token/:role', component: PatientComponent

    },
    {
        path: 'savepatient/:token/:role', component: SavepatientComponent

    },
    {
        path: 'appointments/:token/:role', component: AppointmentsComponent

    },
    {
        path: 'saveappointment/:token/:role', component: SaveappointmentComponent

    },
    {
        path: 'treatmenthistories/:token/:role', component: TreatmentHistoryComponent

    },
    {
        path: 'savetreatmenthistory/:token/:role', component: SavetreatmenthistoryComponent

    },
    {
        path: 'bills/:token/:role', component: BillComponent

    },
    {
        path: 'savebill/:token/:role', component: SavebillComponent

    },
    {
        path: 'insurances/:token/:role', component: InsuranceComponent
    },
    {
        path: 'saveinsurance/:token/:role', component: InsuranceComponent
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