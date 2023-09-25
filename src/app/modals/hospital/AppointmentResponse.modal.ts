export class AppointmentResponse {
    id: string;
    patientName: string;
    patientMobileNo: string;
    doctorAssignedName: string;
    appointmentDate: string;
    appointmentStatus: string;

    constructor(id: string, patientName: string, patientMobileNo: string, doctorAssignedName: string, appointmentDate: string, appointmentStatus: string) {
        this.id = id;
        this.patientName = patientName;
        this.patientMobileNo = patientMobileNo;
        this.doctorAssignedName = doctorAssignedName;
        this.appointmentDate = appointmentDate;
        this.appointmentStatus = appointmentStatus;
    }

}
