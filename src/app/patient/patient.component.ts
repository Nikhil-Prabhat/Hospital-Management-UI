import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';
import { BillResponse } from '../modals/hospital/BillResponse.modal';
import { AppointmentResponse } from '../modals/hospital/AppointmentResponse.modal';
import { TreatmentHistoryResponse } from '../modals/hospital/TreatmentHistoryResponse.modal';
import { DoctorResponse } from '../modals/hospital/DoctorResponse.modal';
import { NgForm } from '@angular/forms';
import { Patient } from '../modals/hospital/Patient.modal';
import { SecurityServiceService } from '../service/security-service.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  GET_PATIENT_LIST_UNSUCCESSFUL = "Get Patient List Operation Unsuccessful ! " + '\n';
  GET_BILL_FOR_PATIENT_UNSUCCESSFUL = "Get Bill For A Patient Operation Unsuccessful ! " + '\n';
  BILL_NOT_FOUND_WITH_PATIENT_ID = "Bill Not Found With Patient ID";
  GET_ALL_APPOINTMENTS_FOR_A_PATIENT_UNSUCCESSFUL = "Get Appointments For A Patient Operation Unsuccessful ! " + '\n';
  GET_ALL_TREATMENT_HISTORIES_FOR_A_PATIENT_UNSUCCESSFUL = "Get Treatment Histories For A Patient Operation Unsuccessful ! " + '\n';
  GET_ALL_DOCTORS_FOR_A_PATIENT_UNSUCCESSFUL = "Get All Doctors For A Patient Operation Unsuccessful ! " + '\n';
  UPDATE_PATIENT_UNSUCCESSFUL = "Update Patient Operation Unsuccessful ! " + '\n';
  DELETE_PATIENT_UNSUCCESSFUL = "Delete Patient Operation Unsuccessful ! " + '\n';
  GET_ALL_DOCTORS_IN_HM_UNSUCCESSFUL = "Get All Doctors in HM Operation Unsuccessful ! ";
  ASSIGN_PATIENT_TO_DOCTOR_UNSUCCESSFUL = "Assign Doctor To Patient Operation Unsuccessful ! " + '\n';

  @ViewChild('updatePatientForm') updatePatientForm!: NgForm;

  patientsList: PatientResponse[] = [];
  billListForPatient: BillResponse[] = [];
  appointmentsListForPatient: AppointmentResponse[] = [];
  treatmentHistoriesListForAPatient: TreatmentHistoryResponse[] = [];
  doctorListForAPatient: DoctorResponse[] = [];
  currentBillForPatient !: BillResponse;
  getAllDoctorsList: DoctorResponse[] = [];

  token !: string;
  getAllPatientsErrorMessage !: string;
  currentPatientName !: string;
  getBillForPatientErrorMessage !: string;
  getAllAppointmentsForAPatientErrorMessage !: string;
  getAllTreatmentHistoriesForAPatientErrorMessage !: string;
  getAllDoctorsForAPatientErrorMessage !: string;
  updatePatientId !: string;
  updatePatientSuccessMessage !: string;
  updatePatientErrorMessage !: string;
  deletePatientSuccessMessage !: string;
  deletePatientErrorMessage !: string;
  getAllDoctorsInHMErrorMessage !: string;
  assignPatientId !: string;
  assignDoctorId!: string;
  assignDoctorToPatientMessage !: string;
  currentRole !: string;
  userLogin !: string;

  isGetBillForAPatient: boolean = false;
  isGetAllAppointmentsForAPatient: boolean = false;
  isGetAllTreatmentHistoriesForAPatient: boolean = false;
  isGetAllDoctorsForAPatient: boolean = false;
  isUpdatePatient: boolean = false;
  isUpatePatientFormSubmitted: boolean = false;
  isUpdatePatientSuccess: boolean = false;
  isDeletePatientSuccess: boolean = false;
  isAssignDoctorToPatientSuccess: boolean = false;


  constructor(private securityService: SecurityServiceService, private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllPatientsErrorMessage = "";
    this.currentPatientName = "";
    this.getAllPatientsErrorMessage = "";
    this.getAllAppointmentsForAPatientErrorMessage = "";
    this.getAllTreatmentHistoriesForAPatientErrorMessage = "";
    this.getAllDoctorsForAPatientErrorMessage = "";
    this.updatePatientErrorMessage = "";
    this.updatePatientSuccessMessage = "";
    this.deletePatientErrorMessage = "";
    this.deletePatientSuccessMessage = "";
    this.getAllDoctorsInHMErrorMessage = "";
    this.assignDoctorId = "";
    this.assignPatientId = "";
    this.assignDoctorToPatientMessage = "";


    this.isGetBillForAPatient = false;
    this.isGetAllAppointmentsForAPatient = false;
    this.isGetAllTreatmentHistoriesForAPatient = false;
    this.isGetAllDoctorsForAPatient = false;
    this.isUpdatePatient = false;
    this.isUpdatePatientSuccess = false;
    this.isUpatePatientFormSubmitted = false;
    this.isDeletePatientSuccess = false;
    this.isAssignDoctorToPatientSuccess = false;

    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];
    
    this.getCurrentUser();
    this.getAllPatientsList();
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

  /* Get All Patient's List */
  public getAllPatientsList() {
    this.hospitalService.getAllPatients(this.token)
      .subscribe(
        (patientList: PatientResponse[]) => {
          for (var patient of patientList)
            this.patientsList.push(patient);
        }, (error: any) => {
          this.getAllPatientsErrorMessage = this.GET_PATIENT_LIST_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );
  }

  /* Get Bill For A Patient */
  public getBillForPatient(patient: PatientResponse) {
    this.billListForPatient = [];
    this.isGetBillForAPatient = !this.isGetBillForAPatient;
    this.currentPatientName = patient.name;
    if (this.isGetBillForAPatient) {
      this.hospitalService.getBillForPatient(this.token, patient.id)
        .subscribe(
          (bill: BillResponse) => {
            this.billListForPatient.push(bill);
            this.currentBillForPatient = bill;
          }, (error: any) => {
            var errorReceived = JSON.stringify(error.error);
            if (errorReceived.includes(this.BILL_NOT_FOUND_WITH_PATIENT_ID)) {
              this.billListForPatient = [];
            } else {
              this.getBillForPatientErrorMessage = this.GET_BILL_FOR_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
            }
          }
        );
    }
  }

  /* Get All Appointments For A Patient */
  public getAppointmentsForAPatient(patient: PatientResponse) {
    this.appointmentsListForPatient = [];
    this.isGetAllAppointmentsForAPatient = !this.isGetAllAppointmentsForAPatient;
    this.currentPatientName = patient.name;

    if (this.isGetAllAppointmentsForAPatient) {
      this.hospitalService.getAllAppointmentsForPatient(this.token, patient.name)
        .subscribe(
          (appointmentResponse: AppointmentResponse[]) => {
            for (var appointment of appointmentResponse) {
              this.appointmentsListForPatient.push(appointment);
            }
          }, (error: any) => {
            this.getAllAppointmentsForAPatientErrorMessage = this.GET_ALL_APPOINTMENTS_FOR_A_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }
  }

  /* Get All Treatment Histories For A Patient */
  public getTreatmentHistoriesForAPatient(patient: PatientResponse) {
    this.treatmentHistoriesListForAPatient = [];
    this.isGetAllTreatmentHistoriesForAPatient = !this.isGetAllTreatmentHistoriesForAPatient;
    this.currentPatientName = patient.name;

    if (this.isGetAllTreatmentHistoriesForAPatient) {
      this.hospitalService.getAllTreatmentHistoriesForAPatient(this.token, patient.id)
        .subscribe(
          (treatmentHistoryResponse: TreatmentHistoryResponse[]) => {
            for (var treatmentHistory of treatmentHistoryResponse) {
              this.treatmentHistoriesListForAPatient.push(treatmentHistory);
            }
          }, (error: any) => {
            this.getAllTreatmentHistoriesForAPatientErrorMessage = this.GET_ALL_TREATMENT_HISTORIES_FOR_A_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }
  }

  /* Get All Doctors For A Patient */
  public getAllDoctorsForAPatient(patient: PatientResponse) {
    this.doctorListForAPatient = [];
    this.isGetAllDoctorsForAPatient = !this.isGetAllDoctorsForAPatient;
    this.currentPatientName = patient.name;

    if (this.isGetAllDoctorsForAPatient) {
      this.hospitalService.getAllDoctorsForAPatient(this.token, patient.id)
        .subscribe(
          (doctorResponse: DoctorResponse[]) => {
            for (var doctor of doctorResponse) {
              this.doctorListForAPatient.push(doctor);
            }
          }, (error: any) => {
            this.getAllDoctorsForAPatientErrorMessage = this.GET_ALL_DOCTORS_FOR_A_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        );
    }
  }

  /* Update Patient */
  public updatePatient() {
    console.log(this.updatePatientForm);
    this.isUpatePatientFormSubmitted = true;

    // Capture all the form details
    var patientName = this.updatePatientForm.value.patientName;
    var mobileNo = this.updatePatientForm.value.mobileNo;
    var briefProblemDescription = this.updatePatientForm.value.briefProblemDescription;
    var address = this.updatePatientForm.value.address;
    var treatmentStatus = this.updatePatientForm.value.treatmentStatus;
    var patient = new Patient(patientName, mobileNo, address, briefProblemDescription, treatmentStatus);

    if (this.isUpdatePatient) {
      this.hospitalService.updatePatient(this.token, this.updatePatientId, patient)
        .subscribe(
          successMessage => {
            this.isUpdatePatientSuccess = true;
            this.updatePatientSuccessMessage = JSON.stringify(successMessage);

            setTimeout(() => {
              this.patientsList = [];
              this.getAllPatientsList();
              this.updatePatientSuccessMessage = "";
              this.isUpdatePatient = false;
            }, 2000);
          }, (error: any) => {
            this.isUpdatePatientSuccess = false;
            this.updatePatientErrorMessage = this.UPDATE_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
          }
        )
    }

    this.updatePatientForm.reset();

  }

  /* Delete Patient */
  public deletePatient(patientResponse: PatientResponse) {
    this.currentPatientName = patientResponse.name;
    this.hospitalService.deletePatient(this.token, patientResponse.id)
      .subscribe(
        successResponse => {
          this.isDeletePatientSuccess = true;
          this.deletePatientSuccessMessage = JSON.stringify(successResponse);

          setTimeout(() => {
            this.patientsList = [];
            this.getAllPatientsList();
            this.deletePatientSuccessMessage = "";
          }, 2000);
        }, (error: any) => {
          this.isDeletePatientSuccess = false;
          this.deletePatientErrorMessage = this.DELETE_PATIENT_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      )

  }

  public updatePatientWithId(patient: PatientResponse) {
    this.isUpdatePatient = !this.isUpdatePatient;
    this.updatePatientId = patient.id;
    this.currentPatientName = patient.name;
  }

  /* Get All doctor's list */
  public getAllDoctorsListForPatientMapping(patientResponse: PatientResponse) {
    this.getAllDoctorsList = [];
    this.assignPatientId = patientResponse.id;
    this.hospitalService.getAllDoctors(this.token)
      .subscribe(
        (doctorList: DoctorResponse[]) => {
          for (var doctor of doctorList) {
            this.getAllDoctorsList.push(doctor);
          }
        }, (error: any) => {
          this.getAllDoctorsList = [];
          this.getAllDoctorsInHMErrorMessage = this.GET_ALL_DOCTORS_IN_HM_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      )
  }

  /* Assign doctor to patient */
  public assignDoctorToPatientOperation(doctorId: string) {
    console.log(doctorId);
    this.assignDoctorId = doctorId;
    this.hospitalService.assignDoctorToPatient(this.token, this.assignPatientId, this.assignDoctorId)
      .subscribe(
        successResponse => {
          this.isAssignDoctorToPatientSuccess = true;
          this.assignDoctorToPatientMessage = JSON.stringify(successResponse);
        }, (error: any) => {
          this.isAssignDoctorToPatientSuccess = false;
          this.assignDoctorToPatientMessage = this.ASSIGN_PATIENT_TO_DOCTOR_UNSUCCESSFUL + JSON.stringify(error.error);
        }
      );

    setTimeout(
      () => {
        this.assignDoctorToPatientMessage = "";
      }, 2000
    );
  }

}
