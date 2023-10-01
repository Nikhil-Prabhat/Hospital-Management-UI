import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/modals/hospital/Appointment.modal';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-saveappointment',
  templateUrl: './saveappointment.component.html',
  styleUrls: ['./saveappointment.component.css']
})
export class SaveappointmentComponent implements OnInit {

  SAVE_APPOINTMENT_UNSUCCESSFUL = "Save Appointment Operation Unsuccessful !";

  @ViewChild('saveAppointmentForm') saveAppointmentForm!: NgForm;

  saveAppointmentMessage!: string;
  isSubmitted !: boolean;
  isSaveAppointmentSuccess !: boolean;
  token !: string;
  newAppointmentStatus = "NOT_ACCEPTED";

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.isSubmitted = false;
    this.isSaveAppointmentSuccess = false;
  }

  /* Save Appointment */
  saveAppointment() {
    console.log(this.saveAppointmentForm);

    this.isSubmitted = true;

    // Capturing the data from the form
    var patientName = this.saveAppointmentForm.value.patientname;
    var patientMobileNo = this.saveAppointmentForm.value.mobileNo;
    var doctorAssignedName = this.saveAppointmentForm.value.doctorAssigned;
    var appointmentDate = this.saveAppointmentForm.value.appointmentDate;
    var appointmentStatus = this.newAppointmentStatus;
    var appointment = new Appointment(patientName, patientMobileNo, doctorAssignedName, appointmentDate, appointmentStatus);

    this.hospitalService.saveAppointment(this.token, appointment)
      .subscribe(
        successResponse => {
          this.isSaveAppointmentSuccess = true;
          this.saveAppointmentMessage = JSON.stringify(successResponse);
        }, (error: any) => {
          this.isSaveAppointmentSuccess = false;
          this.saveAppointmentMessage = this.SAVE_APPOINTMENT_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );

    this.routeToAppointmentPage(this.token);
    this.saveAppointmentForm.reset();
  }

  /* Route to Appointment Page */
  public routeToAppointmentPage(token: string) {
    setTimeout(() => {
      this.router.navigate(['appointments', token]);
    }, 2000);
  }

}
