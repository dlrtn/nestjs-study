import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class MemberRegisterRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  public readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 })
  @ApiProperty({ description: '비밀번호', example: '1234' })
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '닉네임', example: '테스트' })
  public readonly nickname: string;

  @IsNotEmpty()
  @IsPhoneNumber('KR')
  @ApiProperty({ description: '전화번호', example: '010-1234-5678' })
  public readonly phoneNumber: string;
}
