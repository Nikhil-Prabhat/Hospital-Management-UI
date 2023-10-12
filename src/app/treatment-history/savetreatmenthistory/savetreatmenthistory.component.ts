import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorResponse } from 'src/app/modals/hospital/DoctorResponse.modal';
import { PatientResponse } from 'src/app/modals/hospital/PatientResponse.modal';
import { TreatmentHistory } from 'src/app/modals/hospital/TreatmentHistory.modal';
import { TreatmentHistoryResponse } from 'src/app/modals/hospital/TreatmentHistoryResponse.modal';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-savetreatmenthistory',
  templateUrl: './savetreatmenthistory.component.html',
  styleUrls: ['./savetreatmenthistory.component.css']
})
export class SavetreatmenthistoryComponent implements OnInit {

  SAVE_TREATMENT_HISTORY_FAILURE = "Save Treatment History Operation Failure ! ";

  patientList: PatientResponse[] = [];
  doctorList: DoctorResponse[] = [];

  @ViewChild('saveTreatmentHistoryForm') saveTreatmentHistoryForm!: NgForm;

  saveTreatmentHistoryMessage!: string;
  isSubmitted !: boolean;
  isSaveTreatmentHistorySuccess !: boolean;
  token !: string;
  loadPatientMessage: string = "";
  loadDoctorMessage: string = "";
  currentRole !: string;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

    this.isSubmitted = false;
    this.isSaveTreatmentHistorySuccess = false;

    this.loadDoctorMessage = "";
    this.loadPatientMessage = "";

    /* Initialise doctor and patient list */
    this.getAllDoctors();
    this.getAllPatients();
  }

  /* Save Treatment History */
  public saveTreatmentHistory() {
    console.log(this.saveTreatmentHistoryForm);
    this.isSubmitted = true;

    // Capturing the data from the form
    var patientIdFromName = this.saveTreatmentHistoryForm.value.patientName;
    var doctorIdFromName = this.saveTreatmentHistoryForm.value.doctorName;
    var briefDescription = this.saveTreatmentHistoryForm.value.briefDescription;
    var symptoms = this.saveTreatmentHistoryForm.value.symptoms;
    var treatment = this.saveTreatmentHistoryForm.value.treatment;

    var doctor = new DoctorResponse(doctorIdFromName, "", "", "", "");
    var patient = new PatientResponse(patientIdFromName, "", "", "", "", "NOT_STARTED");
    var treatmentHistory = new TreatmentHistory(patient, doctor, briefDescription, symptoms, treatment);

    this.hospitalService.saveTreatmentHistory(this.token, treatmentHistory)
      .subscribe(
        successResponse => {
          this.isSaveTreatmentHistorySuccess = true;
          this.saveTreatmentHistoryMessage = JSON.stringify(successResponse);
        }, (error: any) => {
          this.isSaveTreatmentHistorySuccess = false;
          this.saveTreatmentHistoryMessage = this.SAVE_TREATMENT_HISTORY_FAILURE + JSON.stringify(error.error);
        }
      );

      this.routeToTreatmentHistoryPage(this.token);
      this.saveTreatmentHistoryForm.reset();

  }

  /* Route to Treatment History Page */
  public routeToTreatmentHistoryPage(token: string) {
    setTimeout(() => {
      this.router.navigate(['/treatmenthistories', token, this.currentRole])
    }, 2000);
  }

  /* Get all the patient list */
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

  /* Get All Doctor's List */
  public getAllDoctors() {
    this.hospitalService.getAllDoctors(this.token)
      .subscribe(
        (doctorList: DoctorResponse[]) => {
          for (var doctor of doctorList) {
            this.doctorList.push(doctor);
          }
        }, (error: any) => {
          this.loadDoctorMessage = JSON.stringify(error.error);
        }
      )
  }

}
