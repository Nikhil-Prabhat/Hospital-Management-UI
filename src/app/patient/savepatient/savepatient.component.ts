import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/modals/hospital/Patient.modal';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-savepatient',
  templateUrl: './savepatient.component.html',
  styleUrls: ['./savepatient.component.css']
})
export class SavepatientComponent implements OnInit {

  SAVE_PATIENT_FAILURE = "Save Patient Operation Failure !" + '\n';

  @ViewChild('savePatientForm') savePatientForm!: NgForm;

  savePatientMessage!: string;
  isSubmitted !: boolean;
  isSavePatientSuccess !: boolean;
  token !: string;
  treatmentStatusForNewPatient = "NOT_STARTED";
  currentRole !: string;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

    this.isSubmitted = false;
    this.isSavePatientSuccess = false;
  }

  savePatient() {
    console.log(this.savePatientForm);
    this.isSubmitted = true;

    // Capturing the data from the form
    var patientName = this.savePatientForm.value.patientName;
    var mobileNo = this.savePatientForm.value.mobileNo;
    var address = this.savePatientForm.value.address;
    var briefProblemDescription = this.savePatientForm.value.briefProblemDescription;
    var treatmentStatus = this.treatmentStatusForNewPatient;
    var patient = new Patient(patientName, mobileNo, address, briefProblemDescription, treatmentStatus);

    this.hospitalService.savePatient(this.token, patient)
      .subscribe(
        response => {
          // In case of success response
          this.isSavePatientSuccess = true;
          this.savePatientMessage = JSON.stringify(response);
        }, (error: any) => {
          this.isSavePatientSuccess = false;
          this.savePatientMessage = this.SAVE_PATIENT_FAILURE + error.error;
        }
      );

    this.routeToPatientPage(this.token);
    this.savePatientForm.reset();
  }

  /* Route to Patient's Page */
  public routeToPatientPage(token: string) {
    setTimeout(() => {
      this.router.navigate(['/patients', token, this.currentRole])
    }, 2000);
  }

}
