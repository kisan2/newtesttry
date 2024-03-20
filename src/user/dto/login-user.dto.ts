/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UserLoginDto{
    @ApiProperty()
    @IsEmail()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    password:string

    
    
}