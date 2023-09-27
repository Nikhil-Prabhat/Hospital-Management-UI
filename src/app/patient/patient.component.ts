import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { BillResponse } from '../modals/hospital/BillResponse.modal';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  GET_PATIENT_LIST_UNSUCCESSFUL = "Get Patient List Operation Unsuccessful ! " + '\n';
  GET_BILL_FOR_PATIENT_UNSUCCESSFUL = "Get Bill For A Patient Operation Unsuccessful ! " + '\n';
  BILL_NOT_FOUND_WITH_PATIENT_ID = "Bill Not Found With Patient ID";
  GET_ALL_APPOINTMENTS_FOR_A_PATIENT_UNSUCCESSFUL = "Get Appointments For A Patient Operation Unsuccessful ! " + '\n';

  patientsList: PatientResponse[] = [];
  billListForPatient: BillResponse[] = [];
  appointmentsListForPatient: AppointmentResponse[] = [];
  currentBillForPatient !: BillResponse;

  token !: string;
  getAllPatientsErrorMessage !: string;
  currentPatientName !: string;
  getBillForPatientErrorMessage !: string;
  getAllAppointmentsForAPatientErrorMessage !: string;

  isGetBillForAPatient: boolean = false;
  isGetAllAppointmentsForAPatient: boolean = false;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllPatientsErrorMessage = "";
    this.currentPatientName = "";
    this.getAllPatientsErrorMessage = "";
    this.getAllAppointmentsForAPatientErrorMessage = "";

    this.isGetBillForAPatient = false;
    this.isGetAllAppointmentsForAPatient = false;

    this.token = this.activatedRoute.snapshot.params['token'];
    this.getAllPatientsList();
  }

  /* Get All Patient's List */
  public getAllPatientsList() {
    this.hospitalService.getAllPatients(this.token)
      .subscribe(
        (patientList: PatientResponse[]) => {
          for (var patient of patientList)
            this.patientsList.push(patient);
        }, (error: any) => {
          this.getAllPatientsErrorMessage = this.GET_PATIENT_LIST_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Get Bill For A Patient */
  public getBillForPatient(patient: PatientResponse) {
    this.billListForPatient = [];
    this.isGetBillForAPatient = !this.isGetBillForAPatient;
    this.currentPatientName = patient.name;
    if (this.isGetBillForAPatient) {
      this.hospitalService.getBillForPatient(this.token, patient.id)
        .subscribe(
          (bill: BillResponse) => {
            this.billListForPatient.push(bill);
            this.currentBillForPatient = bill;
          }, (error: any) => {
            var errorReceived = JSON.stringify(error.error);
            if (errorReceived.includes(this.BILL_NOT_FOUND_WITH_PATIENT_ID)) {
              this.billListForPatient = [];
            } else {
              this.getBillForPatientErrorMessage = this.GET_BILL_FOR_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
            }
          }
        );
    }
  }

  /* Get All Appointments For A Patient */
  public getAppointmentsForAPatient(patient: PatientResponse) {
    this.appointmentsListForPatient = [];
    this.isGetAllAppointmentsForAPatient = !this.isGetAllAppointmentsForAPatient;
    this.currentPatientName = patient.name;

    if (this.isGetAllAppointmentsForAPatient) {
      this.hospitalService.getAllAppointmentsForPatient(this.token, patient.name)
        .subscribe(
          (appointmentResponse: AppointmentResponse[]) => {
            console.log(JSON.stringify(appointmentResponse));
            for (var appointment of appointmentResponse) {
              this.appointmentsListForPatient.push(appointment);
            }
          }, (error: any) => {
            console.log(JSON.stringify(error.error));
            this.getAllAppointmentsForAPatientErrorMessage = this.GET_ALL_APPOINTMENTS_FOR_A_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        )
    }
  }

}
