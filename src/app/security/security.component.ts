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

  token!: string;

  constructor(private securityService: SecurityServiceService) { }

  ngOnInit(): void {
    this.loginAndCreateToken(this.authRequest);

  }

  /* Generate Token */
  public loginAndCreateToken(authRequest: AuthRequest) {
    this.securityService.loginAndCreateToken(authRequest)
      .subscribe(
        tokenWithUser => {
          console.log(JSON.stringify(tokenWithUser))
        }
      );
  }

}
