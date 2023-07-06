import {Money} from "./Money";

export class OrderLine {
    private readonly product: object;
    private readonly price: Money;
    private readonly quantity: number;
    private readonly amounts: Money;

    constructor(product: object, quantity: number, price: Money) {
        this.product = product;
        this.price = new Money(price.getValue());
        this.quantity = quantity;
        this.amounts = this.calculateAmounts();
    }

    public getProduct() {
        return this.product;
    }

    public getPrice() {
        return this.price;
    }

    public getQuantity() {
        return this.quantity;
    }

    public getAmount() {
        return this.amounts;
    }

    private calculateAmounts() {
        return this.price.multiply(this.quantity);
    }
}