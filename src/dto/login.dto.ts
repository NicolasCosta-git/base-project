import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginInputDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
