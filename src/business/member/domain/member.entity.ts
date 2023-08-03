import {MemberGrade} from './member-grade';
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
export class MemberEntity {
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

    @CreateDateColumn()
    private readonly createdAt: Date;

    constructor(
        email: string,
        password: string,
        nickname: string,
        phoneNumber: string,
    ) {
        this.id = uuidv4();
        this.email = email;
        this.password = password;
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
}
