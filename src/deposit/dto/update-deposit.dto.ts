/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDepositDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(["pending","completed","rejected"])
    status:string

    @ApiProperty()
    statusReason:string
}
