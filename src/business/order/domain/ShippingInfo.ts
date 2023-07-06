import {Receiver} from "./Receiver";
import {Address} from "./Address";

export class ShippingInfo {
    private readonly receiver: Receiver;
    private readonly address: Address;

    constructor(receiver: Receiver, address: Address) {
        this.receiver = receiver;
        this.address = address;
    }

    public getReceiver(): Receiver {
        return this.receiver;
    }

    public getAddress(): Address {
        return this.address;
    }
}