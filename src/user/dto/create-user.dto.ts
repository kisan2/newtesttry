/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {  IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNo:string

    @ApiProperty( {type: 'string', format: 'binary'})
    @Transform(({ value }) => value.buffer)
    validId:string

    @ApiProperty( {type: 'string', format: 'binary'})
    @Transform(({ value }) => value.buffer)
    profile:string

    // @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    // @Transform(({ value }) => value.map(file => file.buffer))
    // greenCard:string
    

}
