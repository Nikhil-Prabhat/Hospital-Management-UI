export class DoctorResponse {
    id: string;
    name: string;
    specialisation: string;
    mobileNo: string;
    address: string;

    constructor(id: string, name: string, specialisation: string, mobileNo: string, address: string) {
        this.id = id;
        this.name = name;
        this.specialisation = specialisation;
        this.mobileNo = mobileNo;
        this.address = address;
    }
}