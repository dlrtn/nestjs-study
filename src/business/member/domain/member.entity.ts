import { MemberGrade } from './member-grade';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'member' })
export class Member {
  @PrimaryColumn()
  private readonly id: string;

  @Column()
  private readonly email: string;

  @Column()
  private readonly password: string;

  @Column()
  private readonly nickname: string;

  @Column()
  private readonly phoneNumber: string;

  @Column()
  private readonly memberGrade: MemberGrade;

  @UpdateDateColumn()
  private readonly updatedAt: Date;

  @CreateDateColumn()
  private readonly createdAt: Date;

  private constructor(
    id: string,
    email: string,
    password: string,
    nickname: string,
    phoneNumber: string,
    memberGrade: MemberGrade,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.memberGrade = memberGrade;
  }

  public static of(
    email: string,
    password: string,
    nickname: string,
    phoneNumber: string,
  ): Member {
    const memberId = uuidv4();
    const memberGrade = MemberGrade.NORMAL;

    const member = new Member(
      memberId,
      email,
      password,
      nickname,
      phoneNumber,
      memberGrade,
    );

    return member;
  }

  public getMemberId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getMemberGrade(): string {
    return this.memberGrade;
  }
}
