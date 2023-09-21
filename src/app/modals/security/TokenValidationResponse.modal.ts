export class TokenValidationResponse {
    public username: string;
    public role: string;
    public isValid: boolean;

    constructor(username: string, role: string, isValid: boolean) {
        this.username = username;
        this.role = role;
        this.isValid = isValid;
    }
}