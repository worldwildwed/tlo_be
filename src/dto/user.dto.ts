import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

export class UserDTO {
    @IsNumber()
    public id: number

    // Validates for a non-empty string
    @IsString()
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @IsNotEmpty()
    public lastName: string;

    // Gets only validated if it's part of the request's body
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public hash: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public password: string;

    public createdAt: Timestamp
    public updatedAt: Timestamp

    //   // Validates for an integer
    //   @IsNumber()
    //   public age: number;

    //   // Validates for an integer
    //   @IsBoolean()
    //   public acceptedTOS: boolean;

    //   // Validates for a non-empty integer array
    //   @IsArray()
    //   @IsNumber({ allowNaN: false }, { each: true })
    //   @ArrayMinSize(1)
    //   public nums: number[];
}

export class RegisterDTO {
    public username: string;
    public password: string;
    public phone: string;

    @IsOptional()
    public bankacc: string;
}