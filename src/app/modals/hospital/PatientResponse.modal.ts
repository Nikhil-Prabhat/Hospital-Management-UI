export class PatientResponse {
    id: string;
    name: string;
    mobileNo: string;
    address: string;
    briefProblemDescription: string;
    treatmentStatus: string;

    constructor(id: string, name: string, mobileNo: string, address: string, briefProblemDescription: string, treatmentStatus: string) {
        this.id = id;
        this.name = name;
        this.mobileNo = mobileNo;
        this.address = address;
        this.briefProblemDescription = briefProblemDescription;
        this.treatmentStatus = treatmentStatus
    }

}
