/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsString } from "class-validator"

export class createWalletDto{

    @ApiProperty({type:"string",format:"binary"})
    @Transform(({value} ) => value.buffer)
    depositQr:string

    @ApiProperty()
    @IsString()
    walletAddress:string

}