import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';
import { Agent } from '../entity/agent.entity';

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
    public role: number
    public agentId: Agent
    @IsOptional()
    public phone: string;
    @IsOptional()
    public firstName: string
    @IsOptional()
    public lastName: string
}

export class RegisterAgentDTO {
    public name: string
    @IsOptional()
    public detail: string
    @IsOptional()
    public phone: string
    @IsOptional()
    public address: string
}

export class PostRegisterDTO {
    public username: string
    public password: string
    public role: number
    @IsOptional()
    public phone: string;
    @IsOptional()
    public firstName: string
    @IsOptional()
    public lastName: string
}