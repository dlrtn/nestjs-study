import { MemberGrade } from './member-grade';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  public constructor(
    id: string,
    email: string,
    password: string,
    nickname: string,
    phoneNumber: string,
    memberGrade: MemberGrade,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.memberGrade = memberGrade;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
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
