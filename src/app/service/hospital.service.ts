import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../modals/hospital/Doctor.modal';
import { DoctorResponse } from '../modals/hospital/DoctorResponse.modal';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';
import { Patient } from '../modals/hospital/Patient.modal';
import { BillResponse } from '../modals/hospital/BillResponse.modal';
import { Appointment } from '../modals/hospital/Appointment.modal';
import { TreatmentHistory } from '../modals/hospital/TreatmentHistory.modal';
import { Bill } from '../modals/hospital/Bills.modal';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  HOSPITAL_SERVICE_ENDPOINT = "http://HM-hospital-service.ap-south-1.elasticbeanstalk.com:9091/";

  /* Doctor's Endpoint urls*/
  SAVE_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/savedoctors";
  GET_ALL_DOCTORS = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getalldoctors";
  GET_ALL_PATIENTS_FOR_A_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallpatientsforadoctor/";
  GET_ALL_TREATMENT_HISTORIES_FOR_A_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getalltreatmenthistoryforadoctor/";
  GET_ALL_APPOINTMENTS_FOR_A_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallappointmentsforadoctor/"
  UPDATE_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/updatedoctor/";
  DELETE_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/deletedoctor/";

  /* Patient's Endpoint urls */
  GET_ALL_PATIENTS = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallpatients";
  GET_PATIENT_BY_ID = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getpatientbyid/";
  SAVE_PATIENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/savepatients";
  GET_BILL_FOR_A_PATIENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getbillbypatientid/";
  GET_APPOINTMENTS_FOR_A_PATIENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallappointmentsforapatient/";
  GET_TREATMENT_HISTORIES_FOR_A_PATIENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getalltreatmenthistoryforapatient/";
  GET_ALL_DOCTORS_FOR_A_PATIENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getalldoctorsforapatient/";
  UPDATE_PATIENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/updatepatient/";
  DELETE_PATIENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/deletepatient/";

  /* Assign doctor and patient */
  ASSIGN_PATIENT_TO_DOCTOR = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/assignpatienttodoctor/";

  /* Appointment's Endpoints urls */
  GET_ALL_APPOINTMENTS = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallappointments";
  DELETE_APPOINTMENT_BY_ID = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/deleteappointment/";
  UPDATE_APPOINTMENT_STATUS = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/updateappointmentstatus/";
  SAVE_APPOINTMENT = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/saveappointment";

  /* Treatment Histories urls */
  GET_ALL_TREATMENT_HISTORIES = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getalltreatments";
  DELETE_TREATMENT_HISTORY = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/deletetreatment/";
  UPDATE_TREATMENT_HISTORY = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/updatetreatmentintreatmenthistory/";
  SAVE_TREATMENT_HISTORY = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/savetreatmenthistory";

  /* Bills urls */
  GET_ALL_BILLS = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/getallbills";
  UPDATE_BILL = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/updatebill/";
  DELETE_BILL = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/deletebill/"
  TOTAL_BILL_OF_HM = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/gettotalbillofhospital";
  SAVE_BILL = this.HOSPITAL_SERVICE_ENDPOINT + "hospitalapp/savebill";

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

  /* Update doctor */
  public updateDoctor(token: string, id: string, doctor: Doctor) {
    const headers = this.getHeaders(token);
    return this.httpClient.put(this.UPDATE_DOCTOR + id, doctor, { headers, responseType: 'text' as 'json' });
  }

  /* Delete Doctor */
  public deleteDoctor(token: string, id: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.delete(this.DELETE_DOCTOR + id, { headers, responseType: 'text' as 'json' });
  }

  /* Patient's Endpoint */

  /* Get All Patients */
  public getAllPatients(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<PatientResponse[]>(this.GET_ALL_PATIENTS, { headers });
  }

  /* Get Patient By Id */
  public getPatientById(token : string, id : string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<PatientResponse>(this.GET_PATIENT_BY_ID + id, {headers});
  }

  /* Save Patient */
  public savePatient(token: string, patient: Patient) {
    const headers = this.getHeaders(token);
    return this.httpClient.post(this.SAVE_PATIENT, patient, { headers, responseType: 'text' as 'json' });
  }

  /* Get Bill For Patient */
  public getBillForPatient(token: string, patientId: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<BillResponse>(this.GET_BILL_FOR_A_PATIENT + patientId, { headers });
  }

  /* Get Appointments For A Patient */
  public getAllAppointmentsForPatient(token: string, patientName: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<AppointmentResponse[]>(this.GET_APPOINTMENTS_FOR_A_PATIENT + patientName, { headers });
  }

  /* Get Treatment Histories For A Patient */
  public getAllTreatmentHistoriesForAPatient(token: string, patientId: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<TreatmentHistoryResponse[]>(this.GET_TREATMENT_HISTORIES_FOR_A_PATIENT + patientId, { headers });
  }

  /* Get All Doctors For A Patient */
  public getAllDoctorsForAPatient(token: string, patientId: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<DoctorResponse[]>(this.GET_ALL_DOCTORS_FOR_A_PATIENT + patientId, { headers });
  }

  /* Update Patient */
  public updatePatient(token: string, id: string, patient: Patient) {
    const headers = this.getHeaders(token);
    return this.httpClient.put(this.UPDATE_PATIENT + id, patient, { headers, responseType: 'text' as 'json' })
  }

  /* Delete Patient */
  public deletePatient(token: string, id: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.delete(this.DELETE_PATIENT + id, { headers, responseType: 'text' as 'json' });
  }

  /* Assign patient and doctor */
  public assignDoctorToPatient(token: string, patientId: string, doctorId: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.put(this.ASSIGN_PATIENT_TO_DOCTOR + patientId + "/" + doctorId, null, { headers, responseType: 'text' as 'json' })
  }

  /* Appointment's Endpoints */

  /* Get All Appointments */
  public getAllAppointments(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<AppointmentResponse[]>(this.GET_ALL_APPOINTMENTS, { headers });
  }

  /* Delete Appointment */
  public deleteAppointment(token: string, appointmentId: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.delete(this.DELETE_APPOINTMENT_BY_ID + appointmentId, { headers, responseType: 'text' as 'json' });
  }

  /* Update Appointment Status */
  public updateAppointmentStatus(token: string, appointmentId: string, appointmentStatus: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.put(this.UPDATE_APPOINTMENT_STATUS + appointmentId + "/" + appointmentStatus, null, { headers, responseType: 'text' as 'json' });
  }

  /* Save Appointment */
  public saveAppointment(token: string, appointment: Appointment) {
    const headers = this.getHeaders(token);
    return this.httpClient.post(this.SAVE_APPOINTMENT, appointment, { headers, responseType: 'text' as 'json' });
  }

  /* Treatment Histories Endpoints */

  /* Get All Treatment Histories */
  public getAllTreatmentHistories(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<TreatmentHistoryResponse[]>(this.GET_ALL_TREATMENT_HISTORIES, { headers });
  }

  /* Delete Treatment History */
  public deleteTreatmentHistory(token: string, treatmentHistoryId: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.delete(this.DELETE_TREATMENT_HISTORY + treatmentHistoryId, { headers, responseType: 'text' as 'json' });
  }

  /* Update Treatment History */
  public updateTreatmentHistory(token: string, treatmentHistoryId: string, treatment: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.put(this.UPDATE_TREATMENT_HISTORY + treatmentHistoryId + "/" + treatment, null, { headers, responseType: 'text' as 'json' })
  }

  /* Save Treatment History */
  public saveTreatmentHistory(token: string, treatment: TreatmentHistory) {
    const headers = this.getHeaders(token);
    return this.httpClient.post(this.SAVE_TREATMENT_HISTORY, treatment, { headers, responseType: 'text' as 'json' })
  }

  /* Bills Endpoints */

  /* Get All Bills */
  public getAllBills(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get<BillResponse[]>(this.GET_ALL_BILLS, { headers });
  }

  /* Update Bill */
  public updateBill(token: string, idOfBill: string, bill: Bill) {
    const headers = this.getHeaders(token);
    return this.httpClient.put(this.UPDATE_BILL + idOfBill, bill, { headers, responseType: 'text' as 'json' });
  }

  /*Delete Bill */
  public deleteBill(token: string, idOfBill: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.delete(this.DELETE_BILL + idOfBill, { headers, responseType: 'text' as 'json' })
  }

  /*Get Total Bill Of HM */
  public getTotalBillOfHM(token: string) {
    const headers = this.getHeaders(token);
    return this.httpClient.get(this.TOTAL_BILL_OF_HM, { headers, responseType: 'text' as 'json' });
  }

  /* Save Bill */
  public saveBill(token: string, bill: Bill) {
    const headers = this.getHeaders(token);
    return this.httpClient.post(this.SAVE_BILL, bill, { headers, responseType: 'text' as 'json' });
  }

  private getHeaders(token: string) {
    let tokenStr = this.BEARER_PREFIX + token;
    const headers = new HttpHeaders().set(this.AUTHORIZATION, tokenStr);
    return headers;
  }
}
