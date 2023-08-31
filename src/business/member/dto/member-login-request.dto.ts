import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class MemberLoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  public readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ description: '비밀번호', example: '1234' })
  public readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
