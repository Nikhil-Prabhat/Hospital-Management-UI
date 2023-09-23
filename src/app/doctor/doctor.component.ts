import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../service/hospital.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorResponse } from '../modals/hospital/DoctorResponse.modal';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  GET_DOCTORS_LIST_UNSUCCESSFUL = "Doctor's List Fetch Operation Unsuccessful !";

  token !: string;
  doctorsList: DoctorResponse[] = [];
  errorMessage : string = "";

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.errorMessage = "";
    this.token = this.activatedRoute.snapshot.params['token'];
    this.hospitalService.getAllDoctors(this.token)
      .subscribe((doctorsListResponse: DoctorResponse[]) => {
        for (var doctor of doctorsListResponse) {
          this.doctorsList.push(doctor);
        }
      }, (error: any) => {
        this.errorMessage = this.GET_DOCTORS_LIST_UNSUCCESSFUL;
      })
  }

}
