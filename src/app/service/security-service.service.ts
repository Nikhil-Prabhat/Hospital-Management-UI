import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../modals/security/AuthRequest.modal';
import { AuthResponse } from '../modals/security/AuthResponse.modal';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  SECURITY_SERVICE_ENDPOINT = "http://localhost:9090/";
  TOKEN_GENERATE = this.SECURITY_SERVICE_ENDPOINT + "authapp/login";
  TOKEN_VALIDATE = this.SECURITY_SERVICE_ENDPOINT + "authapp/validate";
  BEARER_PREFIX = "Bearer ";
  AUTHORIZATION = "Authorization";

  constructor(private httpClient: HttpClient) { }

  /* Generate token for the user and login */
  public loginAndCreateToken(request: AuthRequest)  {
    return this.httpClient.post<AuthResponse>(this.TOKEN_GENERATE, request);
  }

  /* Validate the user with the token */
  public validate(token: String) {
    let tokenStr = this.BEARER_PREFIX + token;
    const headers = new HttpHeaders().set(this.AUTHORIZATION, tokenStr);
    return this.httpClient.get(this.TOKEN_VALIDATE, { headers, responseType: 'text' as 'json' });
  }

}
