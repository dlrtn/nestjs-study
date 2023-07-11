import { v4 as uuid } from 'uuid';

export class MemberId {
  private readonly memberId: string;

  constructor() {
    this.memberId = uuid();
  }

  public getMemberId() {
    return this.memberId;
  }
}
