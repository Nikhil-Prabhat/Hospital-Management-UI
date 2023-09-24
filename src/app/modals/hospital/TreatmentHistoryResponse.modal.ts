import { DoctorResponse } from "./DoctorResponse.modal";
import { PatientResponse } from "./PatientResponse.modal";

export class TreatmentHistoryResponse {

    id: string;
    patient: PatientResponse;
    doctor: DoctorResponse;
    briefDescription: string;
    symptoms: string;
    treatment: string;

    constructor(id: string, patient: PatientResponse, doctor: DoctorResponse, briefDescription: string, symptoms: string, treatment: string) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.briefDescription = briefDescription;
        this.symptoms = symptoms;
        this.treatment = treatment;
    }

}
