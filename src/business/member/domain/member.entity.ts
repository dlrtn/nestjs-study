import { MemberGrade } from './member-grade';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import * as sha256 from 'crypto-js/sha256';

@Entity({ name: 'Member' })
export class Member {
  @PrimaryColumn({
    comment: '사용자 아이디',
    length: 36,
    type: 'varchar',
  })
  @ApiProperty({
    description: '사용자 아이디',
    example: 'uuid',
  })
  private readonly id: string;

  @Column({
    comment: '사용자 이메일',
    length: 100,
    type: 'varchar',
  })
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  private readonly email: string;

  @Column({
    comment: '사용자 비밀번호',
    length: 255,
    type: 'varchar',
  })
  @ApiProperty({ description: '비밀번호', example: '1234' })
  private readonly password: string;

  @Column({
    comment: '사용자 닉네임',
    length: 100,
    type: 'varchar',
  })
  @ApiProperty({ description: '닉네임', example: '테스트' })
  private readonly nickname: string;

  @Column({
    comment: '사용자 전화번호',
    length: 15,
    type: 'varchar',
  })
  @ApiProperty({ description: '전화번호', example: '010-1234-5678' })
  private readonly phoneNumber: string;

  @Column({
    comment: '사용자 등급',
    length: 10,
    type: 'varchar',
  })
  @ApiProperty({ description: '회원 등급', example: MemberGrade.NORMAL })
  private readonly memberGrade: MemberGrade;

  @UpdateDateColumn({
    comment: '사용자 수정일',
  })
  @ApiProperty({
    description: '최종 수정일',
    example: new Date('2021-01-01 00:00:00'),
  })
  private readonly updatedAt: Date;

  @CreateDateColumn({
    comment: '사용자 생성일',
  })
  @ApiProperty({
    description: '생성일',
    example: new Date('2021-01-01 00:00:00'),
  })
  private readonly createdAt: Date;

  constructor(
    email: string,
    password: string,
    nickname: string,
    phoneNumber: string,
  ) {
    this.id = uuidv4();
    this.email = email;
    this.password = this.hashPassword(password);
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.memberGrade = MemberGrade.NORMAL;
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

  private hashPassword(password: string): string {
    return sha256(password).toString();
  }

  public checkPassword(password: string): boolean {
    return this.password === this.hashPassword(password);
  }
}
