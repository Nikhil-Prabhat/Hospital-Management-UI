import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SecurityComponent } from "./security/security.component";
import { SignupComponent } from "./signup/signup.component";
import { HospitalDashboardComponent } from "./hospital-dashboard/hospital-dashboard.component";

const routes: Routes = [
    {
        path: 'login', component: SecurityComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'dashboard/:username', component: HospitalDashboardComponent
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }