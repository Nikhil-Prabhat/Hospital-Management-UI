import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InsuranceService } from '../service/insurance.service';
import { InsuranceResponse } from '../modals/insurance/InsurerResponse.modal';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  GET_ALL_INSURANCE_LIST_UNSUCCESSFUL = " Get All Insurances List Unsuccessful !";
  DELETE_INSURANCE_UNSUCCESSFUL = "Delete Appointment Operation Unsuccessful !";

  insuranceList: InsuranceResponse[] = [];

  token !: string;
  currentRole !: string;
  getAllInsurancesErrorMessage: string = "";
  deleteInsuranceErrorMessage: string = "";
  deleteInsuranceSuccessMessage: string = "";
  currentInsurance !: string;

  isInsuranceDeleteSuccess: boolean = false;

  pageOffset: number = 0;
  itemLimit: number = 10;

  constructor(private insuranceService: InsuranceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

    this.getAllInsurancesErrorMessage = "";
    this.deleteInsuranceSuccessMessage = "";
    this.deleteInsuranceErrorMessage = "";
    this.currentInsurance = "";

    this.isInsuranceDeleteSuccess = false;

    this.pageOffset = 0;
    this.itemLimit = 10;

    this.getAllInsurances();
  }

  /* Get All Insurances */
  public getAllInsurances() {
    this.insuranceList = [];
    this.insuranceService.getAllInsurances(this.token, this.pageOffset, this.itemLimit)
      .subscribe(
        (insuranceResponseList: InsuranceResponse[]) => {
          for (var insurance of insuranceResponseList) {
            this.insuranceList.push(insurance);
          }
        }, (error: any) => {
          this.getAllInsurancesErrorMessage = this.GET_ALL_INSURANCE_LIST_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Delete Insurance */
  public deleteInsurance(insurance: InsuranceResponse) {
    this.currentInsurance = insurance.insurerName;
    this.insuranceService.deleteInsurance(this.token, insurance.id)
      .subscribe(
        successResponse => {
          this.isInsuranceDeleteSuccess = true;
          this.deleteInsuranceSuccessMessage = JSON.stringify(successResponse);

          // Update insurance's List on the dashboard
          setTimeout(() => {
            this.getAllInsurances();
            this.deleteInsuranceSuccessMessage = "";
          }, 2000);
        }, (error: any) => {
          this.isInsuranceDeleteSuccess = false;
          this.deleteInsuranceErrorMessage = this.DELETE_INSURANCE_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Utility Method For Previous and Next */
  onPrevious() {
    this.pageOffset--;
    this.getAllInsurances();
  }

  onNext() {
    this.pageOffset++;
    this.getAllInsurances();
  }

}
