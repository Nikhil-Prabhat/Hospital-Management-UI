import { InsuranceResponse } from "./InsurerResponse.modal";

export class PatientClaimResponse {
    id : string;
    patientId : string;
    insuranceTaken : InsuranceResponse;
    amountSpent : number;
    remainingAmount : number;

    constructor(id : string, patientId : string, insuranceTaken : InsuranceResponse, amountSpent : number, remainingAmount : number) {
        this.id = id;
        this.patientId = patientId;
        this.insuranceTaken = insuranceTaken;
        this.amountSpent = amountSpent;
        this.remainingAmount = remainingAmount;
    }
}