export class Appointment {

    patientName : string;
    patientMobileNo: string;
    doctorAssignedName : string;
    appointmentDate: string;
    appointmentStatus : string

    constructor(patientName : string, patientMobileNo: string, doctorAssignedName: string, appointmentDate : string, appointmentStatus : string) {
        this.patientName = patientName;
        this.patientMobileNo = patientMobileNo;
        this.doctorAssignedName = doctorAssignedName;
        this.appointmentDate = appointmentDate;
        this.appointmentStatus = appointmentStatus;
    }
    
}