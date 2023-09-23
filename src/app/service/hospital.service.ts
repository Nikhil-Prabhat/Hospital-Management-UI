import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../modals/hospital/Doctor.modal';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  HOSPITAL_SERVICE_ENDPOINT = "http://localhost:9091/";

  /* Doctor's Endpoint urls*/
  SAVE_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/savedoctors";
  BEARER_PREFIX = "Bearer ";
  AUTHORIZATION = "Authorization";

  constructor(private httpClient: HttpClient) { }

  /* Doctor's Endpoint */

  /* Save doctor to the database */
  public saveDoctor(token: string, doctorDTO: Doctor) {
    const headers = this.getHeaders(token);
    return this.httpClient.post(this.SAVE_DOCTOR, doctorDTO, { headers , responseType : 'text' as 'json'});
  }

  private getHeaders(token: string) {
    let tokenStr = this.BEARER_PREFIX + token;
    const headers = new HttpHeaders().set(this.AUTHORIZATION, tokenStr);
    return headers;
  }
}
