import { DoctorResponse } from "./DoctorResponse.modal";
import { PatientResponse } from "./PatientResponse.modal";

export class TreatmentHistory {

    patient: PatientResponse;
    doctor: DoctorResponse;
    briefDescription: string;
    symptoms: string;
    treatment: string;

    constructor(patient: PatientResponse, doctor: DoctorResponse, briefDescription: string, symptoms: string, treatment: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.briefDescription = briefDescription;
        this.symptoms = symptoms;
        this.treatment = treatment;
    }
}

