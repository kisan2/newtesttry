/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AmountDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    balance:string
}