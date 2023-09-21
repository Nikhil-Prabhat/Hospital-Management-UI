import { Component, OnInit } from '@angular/core';
import { SecurityServiceService } from '../service/security-service.service';
import { AuthRequest } from '../modals/security/AuthRequest.modal';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  authRequest: AuthRequest = {
    "username": "Honey",
    "password": "Honey@123"
  };

  tokenValid: boolean = false;
  
  constructor(private securityService: SecurityServiceService) { }

  ngOnInit(): void {

  }

  /* Generate Token */
  public loginAndCreateToken(authRequest: AuthRequest) {
    this.securityService.loginAndCreateToken(authRequest)
      .subscribe(
        tokenWithUser => {
          this.validate(tokenWithUser.token);
        }
      );
  }

  /* Validate Token */
  public validate(token: string) {
    this.securityService.validate(token)
      .subscribe(
        tokenValidationResponse => this.tokenValid = tokenValidationResponse.isValid
      );
  }



}
