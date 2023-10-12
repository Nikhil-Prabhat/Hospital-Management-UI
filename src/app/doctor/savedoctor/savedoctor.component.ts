import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/modals/hospital/Doctor.modal';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-savedoctor',
  templateUrl: './savedoctor.component.html',
  styleUrls: ['./savedoctor.component.css']
})
export class SavedoctorComponent implements OnInit {

  SAVE_DOCTOR_FAILURE = "Failed to Save Doctor ! ";

  @ViewChild('saveDoctorForm') saveDoctorForm!: NgForm;

  saveDoctorMessage!: string;
  isSubmitted !: boolean;
  isSaveDoctorSuccess !: boolean;
  token !: string;
  currentRole !: string;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

    this.isSubmitted = false;
    this.isSaveDoctorSuccess = false;
  }

  saveDoctor() {
    console.log(this.saveDoctorForm);
    this.isSubmitted = true;

    // Capturing the data from the form
    var doctorName = this.saveDoctorForm.value.doctorname;
    var specialisation = this.saveDoctorForm.value.specialisation;
    var mobileNo = this.saveDoctorForm.value.mobileNo;
    var address = this.saveDoctorForm.value.address;

    var doctor = new Doctor(doctorName, specialisation, mobileNo, address);

    this.hospitalService.saveDoctor(this.token, doctor)
      .subscribe(response => {
        // In case of success response
        this.isSaveDoctorSuccess = true;
        this.saveDoctorMessage = JSON.stringify(response);
      }, (error: any) => {
        // In case of error response
        this.isSaveDoctorSuccess = false;
        this.saveDoctorMessage = this.SAVE_DOCTOR_FAILURE + error.error;
      });

    this.routeToDoctorPage(this.token);
    this.saveDoctorForm.reset();
  }

  /* Route to Doctor's Page */
  public routeToDoctorPage(token: string) {
    setTimeout(() => {
      this.router.navigate(['/doctors', token, this.currentRole])
    }, 2000);
  }

}
