import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../service/hospital.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  GET_ALL_BILLS_UNSUCCESSFUL = "Get All Bills Operation Unsuccessful !";

  token !: string;

  

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
  }

  /* Get All Bills */
  public getAllBills() {

  }

}
