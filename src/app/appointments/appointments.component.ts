import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  GET_ALL_APPOINTMENTS_LIST_UNSUCCESSFUL = "Get All Appointments List Operation Unsuccessful !";
  DELETE_APPOINTMENT_UNSUCCESSFUL = "Delete Appointment Operation Unsuccessful !";

  appointmentsList: AppointmentResponse[] = [];

  currentAppointmentForPatient: string = "";
  getAllAppointmentsErrorMessage: string = "";
  deleteAppointmentErrorMessage: string = "";
  deleteAppointmentSuccessMessage: string = "";
  token!: string;

  isAppointmentDeleteSuccess: boolean = false;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAppointmentsErrorMessage = "";
    this.deleteAppointmentErrorMessage = "";
    this.deleteAppointmentSuccessMessage = "";
    this.token = this.activatedRoute.snapshot.params['token'];

    this.isAppointmentDeleteSuccess = false;

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

}
