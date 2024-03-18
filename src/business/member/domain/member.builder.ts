import { MemberGrade } from './member-grade';
import { Member } from './member.entity';
import { v4 as uuidv4 } from 'uuid';

export class MemberBuilder {
  private readonly id: string;
  private email: string;
  private password: string;
  private nickname: string;
  private phoneNumber: string;
  private readonly memberGrade: MemberGrade;
  private readonly updatedAt: Date;
  private readonly createdAt: Date;

  private constructor() {
    const now = new Date();

    this.id = uuidv4();
    this.memberGrade = MemberGrade.NORMAL;
    this.updatedAt = now;
    this.createdAt = now;
  }

  public static new(): MemberBuilder {
    return new MemberBuilder();
  }

  public withEmail(email: string): this {
    this.email = email;
    return this;
  }

  public withPassword(password: string): this {
    this.password = password;
    return this;
  }

  public withNickname(nickname: string): this {
    this.nickname = nickname;
    return this;
  }

  public withPhoneNumber(phoneNumber: string): this {
    this.phoneNumber = phoneNumber;
    return this;
  }

  public build(): Member {
    return new Member(
      this.id,
      this.email,
      this.password,
      this.nickname,
      this.phoneNumber,
      this.memberGrade,
      this.updatedAt,
      this.createdAt,
    );
  }
}
