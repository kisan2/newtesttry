/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateWithdrawalDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accountHolderName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accountNo:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    withdrawalAmount:string

    
}
