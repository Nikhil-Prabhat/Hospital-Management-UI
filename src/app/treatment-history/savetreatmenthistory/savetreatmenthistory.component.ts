import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-savetreatmenthistory',
  templateUrl: './savetreatmenthistory.component.html',
  styleUrls: ['./savetreatmenthistory.component.css']
})
export class SavetreatmenthistoryComponent implements OnInit {

  SAVE_TREATMENT_HISTORY_FAILURE = "Save Treatment History Operation Failure ! ";

  @ViewChild('saveTreatmentHistoryForm') saveTreatmentHistoryForm!: NgForm;

  saveTreatmentHistoryMessage!: string;
  isSubmitted !: boolean;
  isSaveTreatmentHistorySuccess !: boolean;
  token !: string;

  constructor(private hospitalService: HospitalService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.isSubmitted = false;
    this.isSaveTreatmentHistorySuccess = false;
  }

  /* Save Treatment History */
  public saveTreatmentHistory() {
    console.log(this.saveTreatmentHistoryForm);
  }

  /* Route to Treatment History Page */
  public routeToTreatmentHistoryPage(token: string) {
    setTimeout(() => {
      this.router.navigate(['/treatmenthistories', token])
    }, 2000);
  }

}
