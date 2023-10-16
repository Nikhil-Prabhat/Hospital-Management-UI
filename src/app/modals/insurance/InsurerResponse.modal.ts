export class InsuranceResponse {
    id: string;
    insurerName: string;
    insurerAmountLimit: string;
    disbursementTime: string;
    insuranceType: string;
    insurerOriginState: string;
    insurerOriginCountry: string;

    constructor(id: string, insurerName: string, insurerAmountLimit: string, disbursementTime: string, insuranceType: string, originState: string, originCountry: string) {
        this.id = id;
        this.insurerName = insurerName;
        this.insurerAmountLimit = insurerAmountLimit;
        this.disbursementTime = disbursementTime;
        this.insuranceType = insuranceType;
        this.insurerOriginState = originState;
        this.insurerOriginCountry = originCountry;
    }

}
