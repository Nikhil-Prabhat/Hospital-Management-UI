import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';
import { PatientResponse } from '../modals/hospital/PatientResponse.modal';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  GET_PATIENT_LIST_UNSUCCESSFUL = "Get Patient List Operation Unsuccessful ! " + '\n';

  patientsList: PatientResponse[] = [];

  token !: string;
  getAllPatientsErrorMessage !: string;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllPatientsErrorMessage = "";

    this.token = this.activatedRoute.snapshot.params['token'];
    this.getAllPatientsList();
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

}
