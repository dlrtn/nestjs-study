import {MemberId} from "./MemberId";
import {MemberGrade} from "./MemberGrade";

export class Member {
    private readonly id: MemberId;
    private readonly email: string;
    private readonly password: string;
    private readonly nickname: string;
    private readonly phoneNumber: string;
    private readonly memberGrade: MemberGrade;

    constructor(email: string, password: string, nickname: string, phoneNumber: string) {
        this.id = new MemberId();
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.memberGrade = MemberGrade.NORMAL;
    }

    public getMemberId() {
        return this.id.getMemberId();
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public getNickname() {
        return this.nickname;
    }
}