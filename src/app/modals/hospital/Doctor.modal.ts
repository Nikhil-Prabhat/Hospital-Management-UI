export class Doctor {
    name: string;
    specialisation: string;
    mobileNo: string;
    address: string;

    constructor(name:string, specialisation:string, mobileNo:string, address:string) {
        this.name = name;
        this.specialisation = specialisation;
        this.mobileNo = mobileNo;
        this.address = address;
    }
}