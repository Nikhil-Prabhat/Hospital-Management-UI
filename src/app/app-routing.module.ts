import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SecurityComponent } from "./security/security.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
    {
        path: 'login', component: SecurityComponent
    },
    {
        path: 'signup/:username', component: SignupComponent
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