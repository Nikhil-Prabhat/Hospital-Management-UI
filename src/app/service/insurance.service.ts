import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceResponse } from '../modals/insurance/InsurerResponse.modal';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { BillResponse } from '../modals/hospital/BillResponse.modal';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { PatientClaim } from '../modals/insurance/PatientClaim.modal';
import { PatientClaimResponse } from '../modals/insurance/PatientClaimResponse.modal';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  INSURANCE_SERVICE_ENDPOINT = "http://localhost:9092/";

  /* Insurance Endpoints urls */
  GET_ALL_INSURER_DETAILS = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/findallinsurerdetails?pageOffset=";
  GET_INSURANCE_BY_ID = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/findinsurerdetailsbyid/";
  DELETE_INSURANCE = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/deleteinsurerbyid/"

  /* Patient Claim Urls */
  SAVE_PATIENT_CLAIM = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/savepatientclaim"
  GET_ALL_PATIENT_CLAIMS = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/getallpatientclaims";
  DELETE_PATIENT_CLAIM_BY_ID = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/deletepatientclaimbyid/";

  /* Client Urls */
  GET_PATIENT_BY_PATIENT_ID = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/getpatientbyid/";
  GET_BILL_BY_PATEINT_ID = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/getbillbypatientid/";
  GET_TREATMENT_HISTORY_PATIENT_ID = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/getalltreatmenthistoryforapatient/";
  GET_REMAINING_AMOUNT_TO_PAY = this.INSURANCE_SERVICE_ENDPOINT + "insuranceapp/calculatefinalamount/";

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

  /* Get All Patient Claims */
  public getAllPatientClaims(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<PatientClaimResponse[]>(this.GET_ALL_PATIENT_CLAIMS, { headers });
  }

  /* Save Patient Claim */
  public savePatientClaim(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.post(this.SAVE_PATIENT_CLAIM, { headers, responseType: 'text' as 'json' })
  }

  /* Delete Patient Claim By Id */
  public deletePatientClaimById(token: string, idOfPatientClaim: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.delete(this.DELETE_PATIENT_CLAIM_BY_ID + idOfPatientClaim, { headers, responseType: 'text' as 'json' });
  }

  /* Get Patient By Id */
  public getPatientById(token: string, idOfPatient: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<PatientResponse>(this.GET_PATIENT_BY_PATIENT_ID + idOfPatient, { headers });
  }

  /* Get Bill By Patient Id */
  public getBillByPatientId(token: string, idOfPatient: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<BillResponse>(this.GET_BILL_BY_PATEINT_ID + idOfPatient, { headers });
  }

  /* Get Treatment History By Patient Id */
  public getTreatmentHistoryByPatientId(token: string, idOfPatient: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<TreatmentHistoryResponse[]>(this.GET_TREATMENT_HISTORY_PATIENT_ID + idOfPatient, { headers });
  }

  /* Calculate remaining amount to be paid */
  public getRemainingAmountToPay(token: string, idOfPatient: string, idOfInsurance: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<number>(this.GET_REMAINING_AMOUNT_TO_PAY + idOfPatient + "/" + idOfInsurance, { headers });
  }

  /* Get Insurance Details By Id */
  public getInsuraceDetailsById(token: string, idOfInsurance: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<InsuranceResponse>(this.GET_INSURANCE_BY_ID + idOfInsurance, { headers });
  }

  private getHeaders(token: string) {
    let tokenStr = this.BEARER_PREFIX + token;
    const headers = new HttpHeaders().set(this.AUTHORIZATION, tokenStr);
    return headers;
  }
}
