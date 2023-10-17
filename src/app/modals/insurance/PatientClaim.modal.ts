import { InsuranceResponse } from "./InsurerResponse.modal";

export class PatientClaim {
    patientId: string;
    insuranceTaken!: InsuranceResponse;
    amountSpent: number;
    remainingAmount: number;

    constructor(patientId: string, amountSpent: number, remainingAmount: number) {
        this.patientId = patientId;
        this.amountSpent = amountSpent;
        this.remainingAmount = remainingAmount;
    }

    setInsurance(insurance: InsuranceResponse) {
        this.insuranceTaken = insurance;
    }

    getInsurance() {
        return this.insuranceTaken;
    }


}