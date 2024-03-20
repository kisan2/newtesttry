/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateQrDepositDto {

    @ApiProperty({ type: 'string', format: 'binary' })
    @Transform(({ value }) => value.buffer)
    @IsNotEmpty()
    receipt:string

}