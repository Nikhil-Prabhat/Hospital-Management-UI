import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { BillResponse } from '../modals/hospital/BillResponse.modal';
import { NgForm } from '@angular/forms';
import { Bill } from '../modals/hospital/Bills.modal';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  GET_ALL_BILLS_UNSUCCESSFUL = "Get All Bills Operation Unsuccessful !";
  UPDATE_BILL_UNSUCCESSFUL = "Update Bill Operation Unsuccessful !";
  DELETE_BILL_UNSUCCESSFUL = "Delete Bill Operation Unsuccessful !";

  @ViewChild('updateBillForm') updateBillForm!: NgForm;

  billsList: BillResponse[] = [];

  token !: string;
  totalBillOfHM !: string;
  getAllBillsErrorMessage: string = "";
  updateBillSuccessMessage: string = "";
  updateBillErrorMessage: string = "";
  updateBillId: string = "";
  currentPatientForBill: string = "";
  deleteBillSuccessMessage: string = "";
  deleteBillErrorMessage: string = "";
  currentRole !: string;

  isUpdateBill: boolean = false;
  isUpdateBillSuccess: boolean = false;
  isUpdateBillFormSubmitted: boolean = false;
  isDeleteBillSuccess: boolean = false;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isUpdateBill = false;
    this.isUpdateBillSuccess = false;
    this.isUpdateBillFormSubmitted = false;
    this.isDeleteBillSuccess = false;

    this.getAllBillsErrorMessage = "";
    this.updateBillSuccessMessage = "";
    this.updateBillErrorMessage = "";
    this.updateBillId = "";
    this.currentPatientForBill = "";
    this.deleteBillSuccessMessage = "";
    this.deleteBillErrorMessage = "";

    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];
    this.getAllBills();
    this.getTotalBillOfHM();
  }

  /* Get All Bills */
  public getAllBills() {
    this.hospitalService.getAllBills(this.token)
      .subscribe(
        (billList: BillResponse[]) => {
          for (var bill of billList)
            this.billsList.push(bill);
        }, (error: any) => {
          this.getAllBillsErrorMessage = this.GET_ALL_BILLS_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Update Bill */
  public updateBill() {
    console.log(this.updateBillForm);
    this.isUpdateBillFormSubmitted = true;

    // Capture all the form details
    var consultationFee = this.updateBillForm.value.consultationFee;
    var pharmacyFee = this.updateBillForm.value.pharmacyFee;
    var hospitalizationFee = this.updateBillForm.value.hospitalizationFee;
    var patient = new PatientResponse("", "", "", "", "", "NOT_STARTED");
    var bill = new Bill(patient, consultationFee, pharmacyFee, hospitalizationFee);

    if (this.isUpdateBill) {
      this.hospitalService.updateBill(this.token, this.updateBillId, bill)
        .subscribe(
          successResponse => {
            this.isUpdateBillSuccess = true;
            this.updateBillSuccessMessage = JSON.stringify(successResponse);

            // Update current bill's List on the dashboard
            setTimeout(() => {
              this.billsList = [];
              this.getAllBills();
              this.updateBillSuccessMessage = "";
              this.isUpdateBill = false;
            }, 2000);
          }, (error: any) => {
            this.isUpdateBillSuccess = false;
            this.updateBillErrorMessage = this.UPDATE_BILL_UNSUCCESSFUL + JSON.stringify(error);
          }
        );
    }

    this.updateBillForm.reset();

  }

  /* Delete Bill */
  public deleteBill(billResponse: BillResponse) {
    this.currentPatientForBill = billResponse.patient.name;
    this.hospitalService.deleteBill(this.token, billResponse.id)
      .subscribe(
        successResponse => {
          this.isDeleteBillSuccess = true;
          this.deleteBillSuccessMessage = JSON.stringify(successResponse);

          // Update bill 's List on the dashboard
          setTimeout(() => {
            this.billsList = [];
            this.getAllBills();
            this.deleteBillSuccessMessage = "";
          }, 2000);
        }, (error: any) => {
          this.isDeleteBillSuccess = false;
          this.deleteBillErrorMessage = this.DELETE_BILL_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Get Total Bill Of HM */
  public getTotalBillOfHM() {
    this.hospitalService.getTotalBillOfHM(this.token)
      .subscribe(
        successResponse => {
          this.totalBillOfHM = JSON.stringify(successResponse);
        }, (error: any) => {
          console.log(error);
        }
      );
  }

  public updateBillWithId(billResponse: BillResponse) {
    this.isUpdateBill = !this.isUpdateBill;
    this.updateBillId = billResponse.id;
    this.currentPatientForBill = billResponse.patient.name;
  }

}
