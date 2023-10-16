import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceResponse } from '../modals/insurance/InsurerResponse.modal';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  INSURANCE_SERVICE_ENDPOINT = "http://localhost:9092/";

  /* Insurance Endpoints urls */
  GET_ALL_INSURER_DETAILS = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/findallinsurerdetails?pageOffset=";
  DELETE_INSURANCE = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/deleteinsurerbyid/"

  BEARER_PREFIX = "Bearer ";
  AUTHORIZATION = "Authorization";

  constructor(private httpClient: HttpClient) { }

  /* Insurance Endpoints */

  /* Get All Insurances */
  public getAllInsurances(token: string, pageOffset: number, itemLimit: number) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<InsuranceResponse[]>(this.GET_ALL_INSURER_DETAILS + pageOffset + "&itemLimit=" + itemLimit, { headers });
  }

  /* Delete Insurance */
  public deleteInsurance(token: string, idOfInsurance: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.delete(this.DELETE_INSURANCE + idOfInsurance, { headers, responseType: 'text' as 'json' });
  }

  private getHeaders(token: string) {
    let tokenStr = this.BEARER_PREFIX + token;
    const headers = new HttpHeaders().set(this.AUTHORIZATION, tokenStr);
    return headers;
  }
}
