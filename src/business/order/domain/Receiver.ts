export class Receiver {
    private readonly name: string;
    private readonly phoneNumber: string;

    constructor(name: string, phoneNumber: string) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public getName(): string {
        return this.name;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }
}