import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class EmailDTO {
    @IsEmail()
    @IsNotEmpty()
    public email
}

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    public username

    @IsNotEmpty()
    public password
}