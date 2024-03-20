/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';


export class UpdateWithdrawalDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(["pending","completed","rejected","settled"])
    status:string

    @ApiProperty()
    statusReason:string
}
