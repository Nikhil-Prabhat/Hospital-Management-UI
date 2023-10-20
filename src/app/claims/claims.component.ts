import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientClaimResponse } from '../modals/insurance/PatientClaimResponse.modal';
import { InsuranceService } from '../service/insurance.service';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { HospitalService } from '../service/hospital.service';
import { PatientResponseUI } from '../modals/insurance/PatientResponseUI.modal';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  GET_ALL_PATIENT_CLAIMS_UNSUCCESSFUL = "Get All Patient Claims Operation Unsuccessful !";
  DELETE_PATIENT_CLAIMS_UNSUCCESSFUL = "Delete Patient Claim Operation Unsuccessful !";

  patientResponseUIList: PatientResponseUI[] = [];
  patientResponse !: PatientResponse;
  token !: string;
  currentRole !: string;
  getAllPatientClaimErrorMessage !: string;
  deleteClaimErrorMessage !: string;
  deleteClaimSuccessMessage !: string;
  isDeleteClaimSuccess : boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private insuranceService: InsuranceService, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

    this.deleteClaimErrorMessage = "";
    this.deleteClaimSuccessMessage = "";
    this.isDeleteClaimSuccess = false;

    this.getAllPatientClaimErrorMessage = "";
    this.getAllPatientClaims();
  }

  /* Get All Patient Claims */
  public getAllPatientClaims() {
    this.patientResponseUIList = [];
    this.insuranceService.getAllPatientClaims(this.token)
      .subscribe(
        (patientClaimResponse: PatientClaimResponse[]) => {
          for (var patientClaim of patientClaimResponse) {

            this.hospitalService.getPatientById(this.token, patientClaim.patientId)
              .subscribe(
                (patient: PatientResponse) => {
                  var patientResponseUI = new PatientResponseUI(patientClaim, patient.name, patient.mobileNo);
                  this.patientResponseUIList.push(patientResponseUI);
                }, (error: any) => {
                  console.log(JSON.stringify(error.error));
                }
              );
          }
        }, (error: any) => {
          this.getAllPatientClaimErrorMessage = this.GET_ALL_PATIENT_CLAIMS_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Delete Patient Claim */
  public deletePatientClaimById(patientResponseUI: PatientResponseUI) {
    this.insuranceService.deletePatientClaimById(this.token, patientResponseUI.patientClaimResponse.id)
    .subscribe(
      successResponse => {
          this.isDeleteClaimSuccess = true;
          this.deleteClaimSuccessMessage = JSON.stringify(successResponse);

          setTimeout(() => {
            this.getAllPatientClaims();
            this.deleteClaimSuccessMessage = "";
          }, 2000);
      }, (error : any) => {
          this.isDeleteClaimSuccess = false;
          this.deleteClaimErrorMessage = this.DELETE_PATIENT_CLAIMS_UNSUCCESSFUL + JSON.stringify(error.error);
      }
    )

  }

}
