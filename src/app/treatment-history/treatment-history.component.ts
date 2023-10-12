import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-treatment-history',
  templateUrl: './treatment-history.component.html',
  styleUrls: ['./treatment-history.component.css']
})
export class TreatmentHistoryComponent implements OnInit {

  GET_ALL_TREATMENT_HISTORIES_UNSUCCESSFUL = "Get All Treatment Histories Operation Unsuccessful !";
  DELETE_TREATMENT_HISTORY_UNSUCCESSFUL = "Delete Treatment History Operation Unsuccessful !";
  UPDATE_TREATMENT_HISTORY_UNSUCCESSFUL = "Update Treatment History Operation Unsuccessful !";

  @ViewChild('updateTreatmentHistoryForm') updateTreatmentHistoryForm!: NgForm;

  allTreatmentHistoriesList: TreatmentHistoryResponse[] = [];

  token !: string;
  getAllTreatmentHistoriesErrorMessage: string = "";
  deleteTreatmentHistoryErrorMessage: string = "";
  deleteTreatmentHistorySuccessMessage: string = "";
  currentTreatmentHistoryId !: string;
  currentTreatmentHistoryForPatient !: string;
  updateTreatmentHistorySuccessMessage: string = "";
  updateTreatmentHistoryErrorMessage: string = "";

  isTreatmentHistoryDeleteSuccess: boolean = false;
  isUpdateTreatmentHistory: boolean = false;
  isUpdateTreatmentHistorySuccess: boolean = false;
  isUpdateTreatmentHistoryFormSubmitted: boolean = false;
  currentTreatmentHistory : string = ""; 
  currentRole !: string;


  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllTreatmentHistoriesErrorMessage = "";
    this.deleteTreatmentHistoryErrorMessage = "";
    this.deleteTreatmentHistorySuccessMessage = "";
    this.currentTreatmentHistoryForPatient = "";
    this.updateTreatmentHistorySuccessMessage = "";
    this.updateTreatmentHistoryErrorMessage = "";

    this.isTreatmentHistoryDeleteSuccess = false;
    this.isUpdateTreatmentHistory = false;
    this.isUpdateTreatmentHistoryFormSubmitted = false;
    this.isUpdateTreatmentHistorySuccess = false;
    this.isUpdateTreatmentHistory = false;

    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];
    this.getAllTreatmentHistories();
  }

  /* Get All Treatment Histories */
  public getAllTreatmentHistories() {
    this.hospitalService.getAllTreatmentHistories(this.token)
      .subscribe(
        (treatmentHistoriesList: TreatmentHistoryResponse[]) => {
          for (var treatmentHistory of treatmentHistoriesList) {
            this.allTreatmentHistoriesList.push(treatmentHistory);
          }
        }, (error: any) => {
          this.getAllTreatmentHistoriesErrorMessage = this.GET_ALL_TREATMENT_HISTORIES_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Delete Treatment History */
  public deleteTreatmentHistory(treatmentHistory: TreatmentHistoryResponse) {
    this.hospitalService.deleteTreatmentHistory(this.token, treatmentHistory.id)
      .subscribe(
        successResponse => {
          this.deleteTreatmentHistorySuccessMessage = JSON.stringify(successResponse);
          this.isTreatmentHistoryDeleteSuccess = true;

          // Update treatment history List on the dashboard
          setTimeout(() => {
            this.allTreatmentHistoriesList = [];
            this.getAllTreatmentHistories();
            this.deleteTreatmentHistorySuccessMessage = "";
            this.isUpdateTreatmentHistory = false;
          }, 2000);
        }, (error: any) => {
          this.isTreatmentHistoryDeleteSuccess = false;
          this.deleteTreatmentHistoryErrorMessage = this.DELETE_TREATMENT_HISTORY_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      )
  }

  /* Update Treatment */
  public updateTreatmentWithId(treatmentHistory: TreatmentHistoryResponse) {
    this.currentTreatmentHistoryId = treatmentHistory.id;
    this.isUpdateTreatmentHistory = !this.isUpdateTreatmentHistory;
    this.currentTreatmentHistoryForPatient = treatmentHistory.patient.name;
  }

  public updateTreatment() {
    console.log(this.updateTreatmentHistoryForm);
    this.isUpdateTreatmentHistoryFormSubmitted = true;

    // Capture arguments
    var treatment = this.updateTreatmentHistoryForm.controls.treatment.value;
    this.currentTreatmentHistory = treatment;
    

    if (this.isUpdateTreatmentHistory) {
      this.hospitalService.updateTreatmentHistory(this.token, this.currentTreatmentHistoryId, this.currentTreatmentHistory)
        .subscribe(
          successResponse => {
            this.isUpdateTreatmentHistorySuccess = true;
            this.updateTreatmentHistorySuccessMessage = JSON.stringify(successResponse);

            setTimeout(() => {
              this.allTreatmentHistoriesList = [];
              this.getAllTreatmentHistories();
              this.updateTreatmentHistorySuccessMessage = "";
              this.isUpdateTreatmentHistorySuccess = false;
            }, 2000);
          }, (error: any) => {
            this.isUpdateTreatmentHistorySuccess = false;
            this.updateTreatmentHistoryErrorMessage = this.UPDATE_TREATMENT_HISTORY_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }

     this.updateTreatmentHistoryForm.reset();
  }

}
