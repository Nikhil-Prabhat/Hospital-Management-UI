import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../modals/security/AuthRequest.modal';
import { AuthResponse } from '../modals/security/AuthResponse.modal';
import { TokenValidationResponse } from '../modals/security/TokenValidationResponse.modal';
import { HospitalUser } from '../modals/security/HospitalUser.modal';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  SECURITY_SERVICE_ENDPOINT = "http://HM-Security-Service-API.ap-south-1.elasticbeanstalk.com:9090/";
  SAVE_USER = this.SECURITY_SERVICE_ENDPOINT + "authapp/saveuser";
  TOKEN_GENERATE = this.SECURITY_SERVICE_ENDPOINT + "authapp/login";
  TOKEN_VALIDATE = this.SECURITY_SERVICE_ENDPOINT + "authapp/validate";
  BEARER_PREFIX = "Bearer ";
  AUTHORIZATION = "Authorization";

  constructor(private httpClient: HttpClient) { }

  /* Save the user in the database */
  public saveUser(hospitalUser : HospitalUser) {
      return this.httpClient.post(this.SAVE_USER, hospitalUser, {responseType : 'text'});
  }

  /* Generate token for the user and login */
  public loginAndCreateToken(request: AuthRequest)  {
    return this.httpClient.post<AuthResponse>(this.TOKEN_GENERATE, request);
  }

  /* Validate the user with the token */
  public validate(token: string) {
    let tokenStr = this.BEARER_PREFIX + token;
    const headers = new HttpHeaders().set(this.AUTHORIZATION, tokenStr);
    return this.httpClient.get<TokenValidationResponse>(this.TOKEN_VALIDATE, { headers });
  }

}
