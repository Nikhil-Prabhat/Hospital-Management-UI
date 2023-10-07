import { PatientResponse } from "./PatientResponse.modal";

export class Bill {
    patient: PatientResponse;
    consultationFee: number;
    pharmacyFee: number;
    hospitalizationFee: number;

    constructor(patient: PatientResponse, consultationFee: number, pharmacyFee: number, hospitalizationFee: number) {
        this.patient = patient
        this.consultationFee = consultationFee;
        this.pharmacyFee = pharmacyFee;
        this.hospitalizationFee = hospitalizationFee;
    }

}
