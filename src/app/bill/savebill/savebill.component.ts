import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/modals/hospital/Bills.modal';
import { PatientResponse } from 'src/app/modals/hospital/PatientResponse.modal';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-savebill',
  templateUrl: './savebill.component.html',
  styleUrls: ['./savebill.component.css']
})
export class SavebillComponent implements OnInit {

  SAVE_BILL_FAILURE = "Save Bill Operation Unsuccessful !";
  BILL_ALREADY_EXISTS_FOR_PATIENT = "Bill Already Exists For Patient."

  patientList: PatientResponse[] = [];

  @ViewChild('saveBillForm') saveBillForm!: NgForm;

  saveBillMessage !: string;
  token !: string;
  loadPatientMessage !: string;

  isSubmitted: boolean = false;
  isSaveBillSuccess: boolean = false;
  currentRole !: string;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

    this.isSubmitted = false;
    this.isSaveBillSuccess = false;

    this.loadPatientMessage = "";
    this.saveBillMessage = this.SAVE_BILL_FAILURE + this.BILL_ALREADY_EXISTS_FOR_PATIENT;

    /* Initialise patient list */
    this.getAllPatients();
  }

  /* Get All Patients */
  public getAllPatients() {
    this.hospitalService.getAllPatients(this.token)
      .subscribe(
        (patientList: PatientResponse[]) => {
          for (var patient of patientList) {
            this.patientList.push(patient);
          }
        }, (error: any) => {
          this.loadPatientMessage = JSON.stringify(error.error);
        }
      );
  }

  /* Save Bill */
  public saveBill() {
    console.log(this.saveBillForm);
    this.isSubmitted = true;

    // Capturing the data from the form
    var patientIdFromName = this.saveBillForm.value.patientName;
    var consultationFee = this.saveBillForm.value.consultationFee;
    var pharmacyFee = this.saveBillForm.value.pharmacyFee;
    var hospitalizationFee = this.saveBillForm.value.hospitalizationFee;
    var patient = new PatientResponse(patientIdFromName, "", "", "", "", "NOT_STARTED");
    var bill = new Bill(patient, consultationFee, pharmacyFee, hospitalizationFee);

    this.hospitalService.saveBill(this.token, bill)
      .subscribe(
        successResponse => {
          this.isSaveBillSuccess = true;
          this.saveBillMessage = JSON.stringify(successResponse);
        }, (error: any) => {
          this.isSaveBillSuccess = false;
          this.saveBillMessage = this.SAVE_BILL_FAILURE + this.BILL_ALREADY_EXISTS_FOR_PATIENT;
        }
      );

    this.routeToBillPage(this.token);
    this.saveBillForm.reset();
  }

  /* Route to Bill Page */
  public routeToBillPage(token: string) {
    setTimeout(() => {
      this.router.navigate(['/bills', token, this.currentRole])
    }, 2000);
  }

}
