import { IsNotEmpty, IsNumber, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
