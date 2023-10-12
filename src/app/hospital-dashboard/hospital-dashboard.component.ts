import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.css']
})
export class HospitalDashboardComponent implements OnInit {

  currentUser !: string;
  token !: string;
  currentRole !: string;

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.activatedRoute.snapshot.params['username'];
    this.token = this.activatedRoute.snapshot.params['token'];
    this.currentRole = this.activatedRoute.snapshot.params['role'];

  }

}
