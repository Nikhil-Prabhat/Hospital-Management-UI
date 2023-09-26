import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { BillResponse } from '../modals/hospital/BillResponse.modal';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  GET_PATIENT_LIST_UNSUCCESSFUL = "Get Patient List Operation Unsuccessful ! " + '\n';
  GET_BILL_FOR_PATIENT_UNSUCCESSFUL = "Get Bill For A Patient Operation Unsuccessful ! " + '\n';

  patientsList: PatientResponse[] = [];
  billListForPatient : BillResponse[] = [];
  
  token !: string;
  getAllPatientsErrorMessage !: string;
  currentPatientName !: string;
  getBillForPatientErrorMessage !: string;

  isGetBillForAPatient: boolean = false;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllPatientsErrorMessage = "";
    this.currentPatientName = "";
    this.getAllPatientsErrorMessage = "";

    this.isGetBillForAPatient = false;

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
          (bill : BillResponse) => {
            this.billListForPatient.push(bill);
            console.log(JSON.stringify(bill));
          }, (error: any) => {
            console.log(JSON.stringify(error));
            this.getBillForPatientErrorMessage = this.GET_BILL_FOR_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }
  }

}
