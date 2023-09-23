import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalUser } from '../modals/security/HospitalUser.modal';
import { SecurityServiceService } from '../service/security-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SIGNUP_UNSUCCESSFUL_MSG = "Signup Unsuccessful, Plz try again !";
  SIGNUP_SUCCESSFUL_MSG = "Signup Successful ! ";

  @ViewChild('signupForm') signupForm!: NgForm;

  signupMessage !: string;
  isSubmitted !: boolean;
  isSignupSuccess !: boolean;

  constructor(private securityService: SecurityServiceService, private router: Router) { }

  ngOnInit(): void {
    this.isSubmitted = false;
    this.isSignupSuccess = false;
  }

  /* Save user to the database */
  public saveUser() {
    console.log(this.signupForm);
    this.isSubmitted = true;

    //Capturing the data from the form
    var username = this.signupForm.value.username;
    var password = this.signupForm.value.password;
    var role = this.signupForm.value.role;
    var hospitalUser = new HospitalUser(username, password, role);

    this.securityService.saveUser(hospitalUser)
      .subscribe(
        response => {
          this.isSignupSuccess = true;
          this.signupMessage = this.SIGNUP_SUCCESSFUL_MSG + response;
          this.routeToLoginPage();
        }, (error: any) => {
          this.isSignupSuccess = false;
          this.signupMessage = this.SIGNUP_UNSUCCESSFUL_MSG;
        }
      );

    this.signupForm.reset();
  }

  /* Route to Login Page */
  public routeToLoginPage() {
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 2000);
  }

}
