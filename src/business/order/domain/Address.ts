export class Address {
    private readonly firstAddress: string;
    private readonly secondAddress: string;
    private readonly zipCode: string;

    constructor(firstAddress: string, secondAddress: string, zipCode: string) {
        this.firstAddress = firstAddress;
        this.secondAddress = secondAddress;
        this.zipCode = zipCode;
    }

    public getFirstAddress(): string {
        return this.firstAddress;
    }

    public getSecondAddress(): string {
        return this.secondAddress;
    }

    public getZipCode(): string {
        return this.zipCode;
    }
}