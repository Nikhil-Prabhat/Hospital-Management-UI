import { PatientResponse } from "./PatientResponse.modal";

export class BillResponse {
    id: string;
    patient: PatientResponse;
    consultationFee: number;
    pharmacyFee: number;
    hospitalizationFee: number;
    totalAmountOfBill: number;

    constructor(id: string, patient: PatientResponse, consultationFee: number, pharmacyFee: number, hospitalizationFee: number, totalAmountOfBill: number) {
        this.id = id;
        this.patient = patient;
        this.consultationFee = consultationFee;
        this.pharmacyFee = pharmacyFee;
        this.hospitalizationFee = hospitalizationFee;
        this.totalAmountOfBill = totalAmountOfBill;
    }

}
