import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  GET_ALL_APPOINTMENTS_LIST_UNSUCCESSFUL = "Get All Appointments List Operation Unsuccessful !";
  DELETE_APPOINTMENT_UNSUCCESSFUL = "Delete Appointment Operation Unsuccessful !";
  UPDATE_APPOINTMENT_STATUS_UNSUCCESSFUL = "Update Appointment Status Unsuccessful !";

  @ViewChild('updateAppointmentForm') updateAppointmentForm!: NgForm;

  appointmentsList: AppointmentResponse[] = [];

  currentAppointmentForPatient: string = "";
  getAllAppointmentsErrorMessage: string = "";
  deleteAppointmentErrorMessage: string = "";
  deleteAppointmentSuccessMessage: string = "";
  updateAppointmentSuccessMessage: string = "";
  updateAppointmentErrorMessage: string = "";
  token!: string;
  currentAppointmentId !: string;
  currentRole !: string;

  isAppointmentDeleteSuccess: boolean = false;
  isUpdateAppointmentFormSubmitted: boolean = false;
  isUpdateAppointmentSuccess: boolean = false;
  isUpdateAppointment: boolean = false;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAppointmentsErrorMessage = "";
    this.deleteAppointmentErrorMessage = "";
    this.deleteAppointmentSuccessMessage = "";
    this.updateAppointmentErrorMessage = "";
    this.updateAppointmentSuccessMessage = "";
    this.currentAppointmentId = "";

    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

    this.isAppointmentDeleteSuccess = false;
    this.isUpdateAppointmentFormSubmitted = false;
    this.isUpdateAppointmentSuccess = false;
    this.isUpdateAppointment = false;

    this.getAllAppointments();
  }

  /* Get All Appointments */
  public getAllAppointments() {
    this.hospitalService.getAllAppointments(this.token)
      .subscribe(
        (appointmentResponseList: AppointmentResponse[]) => {
          for (var appointment of appointmentResponseList) {
            this.appointmentsList.push(appointment);
          }
        }, (error: any) => {
          this.getAllAppointmentsErrorMessage = this.GET_ALL_APPOINTMENTS_LIST_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Delete Appointment */
  public deleteAppointmentById(appointmentResponse: AppointmentResponse) {
    this.currentAppointmentForPatient = appointmentResponse.patientName;
    this.hospitalService.deleteAppointment(this.token, appointmentResponse.id)
      .subscribe(
        successResponse => {
          this.isAppointmentDeleteSuccess = true;
          this.deleteAppointmentSuccessMessage = JSON.stringify(successResponse);

          // Update appointment's List on the dashboard
          setTimeout(() => {
            this.appointmentsList = [];
            this.getAllAppointments();
            this.deleteAppointmentSuccessMessage = "";
          }, 2000);
        }, (error: any) => {
          this.isAppointmentDeleteSuccess = false;
          this.deleteAppointmentErrorMessage = this.DELETE_APPOINTMENT_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      )
  }

  /* Update Appointment */
  public updateAppointmentWithId(appointmentResponse: AppointmentResponse) {
    this.currentAppointmentId = appointmentResponse.id;
    this.isUpdateAppointment = !this.isUpdateAppointment;
    this.currentAppointmentForPatient = appointmentResponse.patientName;
  }

  public updateAppointmentStatus() {
    this.isUpdateAppointmentFormSubmitted = true;

    // Capture arguments
    var appointmentStatus = this.updateAppointmentForm.value.appointmentStatus;

    if (this.isUpdateAppointment) {
      this.hospitalService.updateAppointmentStatus(this.token, this.currentAppointmentId, appointmentStatus)
        .subscribe(
          successResponse => {
            this.updateAppointmentSuccessMessage = JSON.stringify(successResponse);
            this.isUpdateAppointmentSuccess = true;

            setTimeout(() => {
              this.appointmentsList = [];
              this.getAllAppointments();
              this.updateAppointmentSuccessMessage = "";
              this.isUpdateAppointment = false;
            }, 2000);
          }, (error: any) => {
            this.updateAppointmentErrorMessage = this.UPDATE_APPOINTMENT_STATUS_UNSUCCESSFUL + JSON.stringify(error.error);
            this.isUpdateAppointmentSuccess = false;
          }
        );
    }
  }

}
