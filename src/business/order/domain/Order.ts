import {OrderLine} from "./OrderLine";
import {ShippingInfo} from "./ShippingInfo";
import {OrderState} from "./OrderState";
import {v4 as uuid} from 'uuid';

export class Order {
    private readonly orderId: string;
    private orderLines: OrderLine[];
    private shippingInfo: ShippingInfo;
    private totalAmount: number;
    private state: OrderState;

    constructor(orderLines: OrderLine[], shippingInfo: ShippingInfo) {
        this.orderId = uuid();
        this.setOrderLines(orderLines);
        this.setShippingInfo(shippingInfo);
    }

    public changeShipped() {
        this.state = OrderState.SHIPPED;
    }

    public changeShippingInfo(shippingInfo: ShippingInfo) {
        this.checkNotYetShipped();
        this.setShippingInfo(shippingInfo)
    }

    public cancel() {
        this.checkNotYetShipped();
        this.state = OrderState.CANCELED;
    }

    public completePayment() {
        this.state = OrderState.PREPARING;
    }

    public getOrderId() {
        return this.orderId;
    }

    public getTotalAmount() {
        return this.totalAmount;
    }

    public getOrderLines() {
        return this.orderLines;
    }

    public getShippingInfo() {
        return this.shippingInfo;
    }

    public getState() {
        return this.state;
    }

    private checkNotYetShipped() {
        if (this.state !== OrderState.PAYMENT_WAITING && this.state !== OrderState.PREPARING) {
            throw new Error('Order already shipped.');
        }
    }

    private setShippingInfo(shippingInfo: ShippingInfo) {
        this.verifyShippingInfo(shippingInfo)
        this.shippingInfo = shippingInfo;
    }

    private verifyShippingInfo(shippingInfo: ShippingInfo) {
        if (!shippingInfo) {
            throw new Error('Order must have shipping info.');
        }
    }

    private setOrderLines(orderLines: OrderLine[]) {
        this.verifyAtLeastOneOrMoreOrderLines(orderLines);
        this.orderLines = orderLines;
        this.totalAmount = this.calculateTotalAmount(orderLines)
    }

    private verifyAtLeastOneOrMoreOrderLines(orderLines: OrderLine[]) {
        if (!orderLines || orderLines.length === 0) {
            throw new Error('Order must have at least one or more order lines.');
        }
    }

    private calculateTotalAmount(orderLines: OrderLine[]) {
        return orderLines.map(orderLine => orderLine.getAmount()).reduce((a, b) => a + b.getValue(), 0);
    }
}