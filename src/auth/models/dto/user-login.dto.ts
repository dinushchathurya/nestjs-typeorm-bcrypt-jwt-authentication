import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}