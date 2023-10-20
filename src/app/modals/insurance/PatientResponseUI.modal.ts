import { PatientClaimResponse } from "./PatientClaimResponse.modal";

export class PatientResponseUI {
    patientClaimResponse: PatientClaimResponse;
    patientName: string;
    patientMobileNo: string;

    constructor(patientClaimResponse: PatientClaimResponse, patientName: string, patientMobileNo: string) {
        this.patientClaimResponse = patientClaimResponse;
        this.patientName = patientName;
        this.patientMobileNo = patientMobileNo;
    }

    setPatientClaimResponse(patientClaimResponse: PatientClaimResponse) {
        this.patientClaimResponse = patientClaimResponse;
    }

    getPatientClaimsResponse() {
        return this.patientClaimResponse;
    }

    setPatientName(patientName: string) {
        this.patientName = patientName;
    }

    getPatientName() {
        return this.patientName;
    }

    setPatientMobileNo(patientMobileNo: string) {
        this.patientMobileNo = patientMobileNo;
    }

    getPatientMobileNo() {
        return this.patientMobileNo;
    }
}