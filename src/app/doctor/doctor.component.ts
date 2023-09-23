import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../service/hospital.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  token !: string;

  constructor(private hospitalService : HospitalService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
  }

}
