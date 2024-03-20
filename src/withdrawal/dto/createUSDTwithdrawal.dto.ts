/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateUSDTWithdrawalDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    walletAddress:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    withdrawalAmount:string
    
}