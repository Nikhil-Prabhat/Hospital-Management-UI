
export class Bill {
    consultationFee: number;
    pharmacyFee: number;
    hospitalizationFee: number;

    constructor(consultationFee: number, pharmacyFee: number, hospitalizationFee: number) {
        this.consultationFee = consultationFee;
        this.pharmacyFee = pharmacyFee;
        this.hospitalizationFee = hospitalizationFee;
    }

}
