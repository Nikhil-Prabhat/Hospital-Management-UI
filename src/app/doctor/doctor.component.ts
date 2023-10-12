import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../service/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorResponse } from '../modals/hospital/DoctorResponse.modal';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';
import { Doctor } from '../modals/hospital/Doctor.modal';
import { NgForm } from '@angular/forms';
import { SecurityServiceService } from '../service/security-service.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  GET_DOCTORS_LIST_UNSUCCESSFUL = "Doctor's List Fetch Operation Unsuccessful !" + '\n';
  GET_ALL_PATIENTS_LIST_FOR_A_DOCTOR_UNSUCCESSFUL = "Patient's List For A Doctor Fetch Operation Unsuccessful !" + '\n';
  GET_ALL_TREATMENT_HISTORIES_FOR_A_DOCTOR_UNSUCCESSFUL = "Treatment Histories List For A Doctor Fetch Operation Unsuccessful !" + '\n';
  GET_ALL_APPOINTMENTS_FOR_A_DOCTOR_UNSUCCESSFUL = "Appointments For A Doctor Fetch Operation Unsuccessful !" + '\n';
  UPDATE_DOCTOR_UNSUCCESSFUL = "Update Doctor Operation Unsuccessful ! " + '\n';
  DELETE_DOCTOR_UNSUCCESSFUL = "Delete Doctor Operation Unsuccessful !" + '\n';

  @ViewChild('updateDoctorForm') updateDoctorForm!: NgForm;

  doctorsList: DoctorResponse[] = [];
  patientListForADoctor: PatientResponse[] = [];
  treatmentHistoriesListForADoctor: TreatmentHistoryResponse[] = [];
  appointmentListForADoctor: AppointmentResponse[] = [];

  token !: string;
  getAllDoctorsErrorMessage: string = "";
  getAllPatientsForADoctorErrorMessage: string = "";
  getAllTreatmentHistoriesForADoctorErrorMessage: string = "";
  getAllAppointmentsForADoctorErrorMessage: string = "";
  currentDoctor !: string;
  updateDoctorSuccessMessage !: string;
  updateDoctorErrorMessage !: string;
  updateDoctorId !: string;
  deleteDoctorSuccessMessage !: string;
  deleteDoctorErrorMessage !: string;
  currentRole !: string;
  userLogin !: string;

  isGetAllPatientsForADoctor: boolean = false;
  isGetAllTreatmentHistoriesForADoctor: boolean = false;
  isGetAllAppointmentsForADoctor: boolean = false;
  isUpdateDoctor: boolean = false;
  isUpdateDoctorSuccess !: boolean;
  isUpateDoctorFormSubmitted !: boolean;
  isDeleteDoctorSuccess: boolean = false;

  constructor(private securityService: SecurityServiceService, private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllDoctorsErrorMessage = "";
    this.getAllPatientsForADoctorErrorMessage = "";
    this.getAllTreatmentHistoriesForADoctorErrorMessage = "";
    this.getAllAppointmentsForADoctorErrorMessage = "";
    this.updateDoctorSuccessMessage = "";
    this.updateDoctorErrorMessage = "";
    this.updateDoctorId = "";
    this.currentDoctor = "";
    this.deleteDoctorSuccessMessage = "";
    this.deleteDoctorErrorMessage = "";

    this.isUpdateDoctorSuccess = false;
    this.isUpateDoctorFormSubmitted = false;
    this.isDeleteDoctorSuccess = false;

    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];
    this.getCurrentUser();
    this.getAllDoctorsList();
  }

  /* Find current user */
  public getCurrentUser() {
    this.securityService.validate(this.token)
      .subscribe(
        tokenValidationResponse => {
          this.userLogin = tokenValidationResponse.username;
          console.log(this.userLogin);
        }, (error: any) => {
          console.log(JSON.stringify(error));
        }
      );
  }

  /* Get All Doctor's List */
  public getAllDoctorsList() {
    this.hospitalService.getAllDoctors(this.token)
      .subscribe((doctorsListResponse: DoctorResponse[]) => {
        for (var doctor of doctorsListResponse) {
          this.doctorsList.push(doctor);
        }
      }, (error: any) => {
        this.getAllDoctorsErrorMessage = this.GET_DOCTORS_LIST_UNSUCCESSFUL + JSON.stringify(error.error);
      });
  }

  /* Get All Patients For A Doctor */
  public getAllPatientsForADoctor(doctor: DoctorResponse) {
    this.patientListForADoctor = [];
    this.currentDoctor = doctor.name;
    this.isGetAllPatientsForADoctor = !this.isGetAllPatientsForADoctor;
    if (this.isGetAllPatientsForADoctor) {
      this.hospitalService.getAllPatientsForADoctor(this.token, doctor.id)
        .subscribe(
          (patientResponseList: PatientResponse[]) => {
            for (var patient of patientResponseList) {
              this.patientListForADoctor.push(patient);
            }
          }, (error: any) => {
            this.getAllPatientsForADoctorErrorMessage = this.GET_ALL_PATIENTS_LIST_FOR_A_DOCTOR_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }
  }

  /* Get All Treatment Histories For A Doctor */
  public getAllTreatmentHistoriesForADoctor(doctor: DoctorResponse) {
    this.treatmentHistoriesListForADoctor = [];
    this.currentDoctor = doctor.name;
    this.isGetAllTreatmentHistoriesForADoctor = !this.isGetAllTreatmentHistoriesForADoctor;

    if (this.isGetAllTreatmentHistoriesForADoctor) {
      this.hospitalService.getAllTreatmentHistoriesForADoctor(this.token, doctor.id)
        .subscribe(
          (treatmentHistoriesList: TreatmentHistoryResponse[]) => {
            for (var treatmentHistory of treatmentHistoriesList) {
              this.treatmentHistoriesListForADoctor.push(treatmentHistory);
            }
          }, (error: any) => {
            this.getAllTreatmentHistoriesForADoctorErrorMessage = this.GET_ALL_TREATMENT_HISTORIES_FOR_A_DOCTOR_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }
  }

  /* Get All Appointments For A Doctor */
  public getAllAppointmentsForADoctor(doctor: DoctorResponse) {
    this.appointmentListForADoctor = [];
    this.currentDoctor = doctor.name;
    this.isGetAllAppointmentsForADoctor = !this.isGetAllAppointmentsForADoctor;

    if (this.isGetAllAppointmentsForADoctor) {
      this.hospitalService.getAllAppointmentsForADoctor(this.token, this.currentDoctor)
        .subscribe(
          (appointmentList: AppointmentResponse[]) => {
            for (var appointment of appointmentList) {
              this.appointmentListForADoctor.push(appointment);
            }
          }, (error: any) => {
            this.getAllAppointmentsForADoctorErrorMessage = this.GET_ALL_APPOINTMENTS_FOR_A_DOCTOR_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }
  }

  /* Update Doctor */
  public updateDoctor() {
    this.isUpateDoctorFormSubmitted = true;

    // Capture all the form details
    var doctorName = this.updateDoctorForm.value.doctorName;
    var specialisation = this.updateDoctorForm.value.specialisation;
    var mobileNo = this.updateDoctorForm.value.mobileNo;
    var address = this.updateDoctorForm.value.address;
    var doctorToBeUpdated = new Doctor(doctorName, specialisation, mobileNo, address);

    if (this.isUpdateDoctor) {
      this.hospitalService.updateDoctor(this.token, this.updateDoctorId, doctorToBeUpdated)
        .subscribe(
          successMessage => {
            this.isUpdateDoctorSuccess = true;
            this.updateDoctorSuccessMessage = JSON.stringify(successMessage);

            // Update current doctor's List on the dashboard
            setTimeout(() => {
              this.doctorsList = [];
              this.getAllDoctorsList();
              this.updateDoctorSuccessMessage = "";
              this.isUpdateDoctor = false;
            }, 2000);
          }, (error: any) => {
            this.isUpdateDoctorSuccess = false;
            this.updateDoctorErrorMessage = this.UPDATE_DOCTOR_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }

    this.updateDoctorForm.reset();
  }

  /* Delete Doctor */
  public deleteDoctor(doctorResponse: DoctorResponse) {
    this.currentDoctor = doctorResponse.name;
    this.hospitalService.deleteDoctor(this.token, doctorResponse.id)
      .subscribe(
        successResponse => {
          this.isDeleteDoctorSuccess = true;
          this.deleteDoctorSuccessMessage = JSON.stringify(successResponse);

          // Update current doctor's List on the dashboard
          setTimeout(() => {
            this.doctorsList = [];
            this.getAllDoctorsList();
            this.deleteDoctorSuccessMessage = "";
          }, 2000);
        }, (error: any) => {
          this.isDeleteDoctorSuccess = false;
          this.deleteDoctorErrorMessage = this.DELETE_DOCTOR_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  public updateDoctorWithId(doctorResponse: DoctorResponse) {
    this.isUpdateDoctor = !this.isUpdateDoctor;
    this.updateDoctorId = doctorResponse.id;
    this.currentDoctor = doctorResponse.name;
  }

}
