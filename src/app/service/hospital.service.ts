import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../modals/hospital/Doctor.modal';
import { DoctorResponse } from '../modals/hospital/DoctorResponse.modal';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  HOSPITAL_SERVICE_ENDPOINT = "http://localhost:9091/";

  /* Doctor's Endpoint urls*/
  SAVE_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/savedoctors";
  GET_ALL_DOCTORS = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getalldoctors";
  GET_ALL_PATIENTS_FOR_A_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallpatientsforadoctor/";
  GET_ALL_TREATMENT_HISTORIES_FOR_A_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getalltreatmenthistoryforadoctor/";
  GET_ALL_APPOINTMENTS_FOR_A_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallappointmentsforadoctor/"
  BEARER_PREFIX = "Bearer ";
  AUTHORIZATION = "Authorization";

  constructor(private httpClient: HttpClient) { }

  /* Doctor's Endpoint */

  /* Save doctor to the database */
  public saveDoctor(token: string, doctorDTO: Doctor) {
    const headers = this.getHeaders(token);
    return this.httpClient.post(this.SAVE_DOCTOR, doctorDTO, { headers, responseType: 'text' as 'json' });
  }

  /* Get All Doctors From the Database */
  public getAllDoctors(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<DoctorResponse[]>(this.GET_ALL_DOCTORS, { headers })
  }

  /* Get All Patients For A Doctor */
  public getAllPatientsForADoctor(token: string, id: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<PatientResponse[]>(this.GET_ALL_PATIENTS_FOR_A_DOCTOR + id, { headers });
  }

  /* Get All Treatment Histories For A Doctor */
  public getAllTreatmentHistoriesForADoctor(token: string, id: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<TreatmentHistoryResponse[]>(this.GET_ALL_TREATMENT_HISTORIES_FOR_A_DOCTOR + id, { headers });
  }

  /* Get All Appointments For A Doctor */
  public getAllAppointmentsForADoctor(token: string, doctorName: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<AppointmentResponse[]>(this.GET_ALL_APPOINTMENTS_FOR_A_DOCTOR + doctorName, { headers });
  }

  private getHeaders(token: string) {
    let tokenStr = this.BEARER_PREFIX + token;
    const headers = new HttpHeaders().set(this.AUTHORIZATION, tokenStr);
    return headers;
  }
}
