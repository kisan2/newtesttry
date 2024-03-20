/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";


export class TimestampDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(["1","2","3"])
    timestamp:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    rate:string
}