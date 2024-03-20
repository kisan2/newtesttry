/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString} from "class-validator";

export class CreateDepositDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accountNO:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accountHolderName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    amount:string 

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    @Transform(({ value }) => value.map(file => file.buffer))
    receipt:string

}

