import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceService } from '../service/insurance.service';
import { PatientClaim } from '../modals/insurance/PatientClaim.modal';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { BillResponse } from '../modals/hospital/BillResponse.modal';
import { InsuranceResponse } from '../modals/insurance/InsurerResponse.modal';

@Component({
  selector: 'app-billprocess',
  templateUrl: './billprocess.component.html',
  styleUrls: ['./billprocess.component.css']
})
export class BillprocessComponent implements OnInit {

  GET_INSURANCE_BY_ID_UNSUCCESSFUL = "Get Insurance By Id Operation Failure !";
  GET_PATIENT_BY_PATIENT_ID_UNSUCCESSFUL = "Get Patient By Patient Id Unsuccessful !";
  GET_TREATMENT_HISTORIES_BY_PATIENT_ID_UNSUCCESSFUL = "Get Treatment Histories By Patient Id Unsuccessful !";
  GET_BILL_BY_PATIENT_ID_UNSUCCESSFUL = "Get Bill By Patient Id Operation Unsuccessful !";
  GET_REMAINING_AMOUNT_TO_PAY_UNSUCCESSFUL = "Get Remaining Amount To Pay Operation Unsuccessful !";;

  patientResponse !: PatientResponse;
  treatmentHistoryList : TreatmentHistoryResponse[] = [];
  billResponse !: BillResponse;
  insuranceResponse !: InsuranceResponse;

  token !: string;
  patientId !: string;
  currentRole !: string;
  insuranceId !: string;
  remainingAmount !: number;
  getInsuranceByIdErrorMessage !: string;
  getPatientByPatientIdErrorMessage !: string;
  getTreatmentHistoryByPatientIdErrorMessage !: string;
  getBillByPatientIdErrorMessage !: string;
  getRemaingAmountErrorMessage !: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private insuranceService: InsuranceService) {
  }

  ngOnInit(): void {
    this.getInsuranceByIdErrorMessage = "";
    this.getPatientByPatientIdErrorMessage = "";
    this.getTreatmentHistoryByPatientIdErrorMessage = "";
    this.getBillByPatientIdErrorMessage = "";
    this.getRemaingAmountErrorMessage = "";

    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];
    this.patientId = this.activatedRoute.snapshot.params['patientId'];
    this.insuranceId = this.activatedRoute.snapshot.params['insuranceId'];

    this.getInsuranceById();
    this.getPatientByPatientId();
    this.getTreatmentHistoriesByPatientId();
    this.getBillByPatientId();
    this.getRemainingCostToPay();
  }

  /* Get Insurance By Id */
  public getInsuranceById() {
    this.insuranceService.getInsuraceDetailsById(this.token, this.insuranceId)
      .subscribe(
        (insuranceObj: InsuranceResponse) => {
          this.insuranceResponse = insuranceObj;
        }, (error: any) => {
          this.getInsuranceByIdErrorMessage = this.GET_INSURANCE_BY_ID_UNSUCCESSFUL;
        }
      );
  }

  /* Get Patient By Patient Id */
  public getPatientByPatientId() {
    this.insuranceService.getPatientById(this.token, this.patientId)
      .subscribe(
        (patientObj: PatientResponse) => {
          this.patientResponse = patientObj;
        }, (error: any) => {
          this.getPatientByPatientIdErrorMessage = this.GET_PATIENT_BY_PATIENT_ID_UNSUCCESSFUL;
        }
      );
  }

  /* Get Treatment History By Patient Id */
  public getTreatmentHistoriesByPatientId() {
    this.insuranceService.getTreatmentHistoryByPatientId(this.token, this.patientId)
      .subscribe(
        (treatmentResponseList: TreatmentHistoryResponse[]) => {
          for (var treatmentHistory of treatmentResponseList) {
            this.treatmentHistoryList.push(treatmentHistory);
          }
          console.log( "treatment list " + JSON.stringify(this.treatmentHistoryList));
        }, (error: any) => {
          this.getTreatmentHistoryByPatientIdErrorMessage = this.GET_TREATMENT_HISTORIES_BY_PATIENT_ID_UNSUCCESSFUL;
        }
      );

      
  }

  /* Get Bill By Patient Id */
  public getBillByPatientId() {
    this.insuranceService.getBillByPatientId(this.token, this.patientId)
      .subscribe(
        (billResponse: BillResponse) => {
          this.billResponse = billResponse;
        }, (error: any) => {
          this.getBillByPatientIdErrorMessage = this.GET_BILL_BY_PATIENT_ID_UNSUCCESSFUL;
        }
      );
  }

  /* Calculate Remaining Cost */
  public getRemainingCostToPay() {
    this.insuranceService.getRemainingAmountToPay(this.token, this.patientId, this.insuranceId)
      .subscribe(
        (amount: number) => {
          this.remainingAmount = amount;
        }
      ), (error: any) => {
        this.getRemaingAmountErrorMessage = this.GET_REMAINING_AMOUNT_TO_PAY_UNSUCCESSFUL;
      }
  }

}
