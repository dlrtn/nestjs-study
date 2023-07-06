export class Money {
    private readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }

    public add(money: Money): Money {
        return new Money(this.value + money.getValue());
    }

    public subtract(money: Money): Money {
        return new Money(this.value - money.getValue());
    }

    public multiply(value: number): Money {
        return new Money(this.value * value);
    }

    public divide(value: number): Money {
        return new Money(this.value / value);
    }
}