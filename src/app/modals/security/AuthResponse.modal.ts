export class AuthResponse {
    public username: string;
    public token: string;

    constructor(username: string, token: string) {
        this.username = username;
        this.token = token;
    }
}