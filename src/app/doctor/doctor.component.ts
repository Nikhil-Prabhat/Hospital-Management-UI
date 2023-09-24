import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../service/hospital.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorResponse } from '../modals/hospital/DoctorResponse.modal';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';

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

  isGetAllPatientsForADoctor: boolean = false;
  isGetAllTreatmentHistoriesForADoctor: boolean = false;
  isGetAllAppointmentsForADoctor: boolean = false;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllDoctorsErrorMessage = "";
    this.getAllPatientsForADoctorErrorMessage = "";
    this.getAllTreatmentHistoriesForADoctorErrorMessage = "";
    this.getAllAppointmentsForADoctorErrorMessage = "";

    this.token = this.activatedRoute.snapshot.params['token'];
    this.getAllDoctorsList();

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

}
