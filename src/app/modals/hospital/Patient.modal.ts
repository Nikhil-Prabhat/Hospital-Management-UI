export class Patient {
    name: string;
    mobileNo: string;
    address: string;
    briefProblemDescription: string;
    treatmentStatus: string;

    constructor(name: string, mobileNo: string, address: string, briefProblemDescription: string, treatmentStatus: string) {
        this.name = name;
        this.mobileNo = mobileNo;
        this.address = address;
        this.briefProblemDescription = briefProblemDescription;
        this.treatmentStatus = treatmentStatus;
    }
}