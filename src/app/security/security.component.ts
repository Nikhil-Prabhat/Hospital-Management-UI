import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityServiceService } from '../service/security-service.service';
import { AuthRequest } from '../modals/security/AuthRequest.modal';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  LOGIN_UNSUCCESSFUL_MSG = "Login Unsuccessful, Plz try again !";
  LOGIN_SUCCESSFUL_MSG = "Login Successful, Welcome ";

  @ViewChild('loginForm') loginForm!: NgForm;

  loginMessage!: string;
  isSubmitted !: boolean;
  isLoginSuccess !: boolean;

  constructor(private securityService: SecurityServiceService, private router: Router) { }

  ngOnInit(): void {
    this.isSubmitted = false;
    this.isLoginSuccess = false;
  }

  /* Generate Token */
  public loginAndCreateToken() {
    console.log(this.loginForm);
    this.isSubmitted = true;

    // Capturing the data from the form
    var username = this.loginForm.value.username;
    var password = this.loginForm.value.password;
    var authRequest = new AuthRequest(username, password);

    this.securityService.loginAndCreateToken(authRequest)
      .subscribe(
        tokenWithUser => {
          // In case of success response
          this.isLoginSuccess = true;
          this.loginMessage = this.LOGIN_SUCCESSFUL_MSG + tokenWithUser.username + " !";
          this.securityService.validate(tokenWithUser.token)
            .subscribe(
              tokenValidationResponse => {
                this.routeToDashboardPage(tokenWithUser.token, tokenWithUser.username, tokenValidationResponse.role);
              }
            );

        }, (error: any) => {
          // In case of error response
          this.isLoginSuccess = false;
          this.loginMessage = this.LOGIN_UNSUCCESSFUL_MSG;
        }
      );

    this.loginForm.reset();
  }

  /* Route to Dashboard Page */
  public routeToDashboardPage(token: string, username: string, role: string) {
    setTimeout(() => {
      this.router.navigate(['/dashboard', token, username, role])
    }, 2000);
  }



}
