import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class MemberLoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  public readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ description: '비밀번호', example: '1234' })
  public readonly password: string;
}
