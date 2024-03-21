/* eslint-disable prettier/prettier */
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, HttpException, HttpStatus, ParseUUIDPipe, InternalServerErrorException, ValidationPipe, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer_g.config';
import { Roles } from '../decorator/Role.decorator';
import { roles } from '../util/roles';
import { CanAccess } from '../Guard/CanAccess.guard';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { CreateQrDepositDto } from './dto/qrdeposit.dto';
// import { QrDeposit } from './entities/qrdeposit.entity';
// import { CreateQrDepositDto } from './dto/qrdeposit.dto';


@Controller('deposit')
@ApiTags('deposit')
@ApiBearerAuth("jwt")
export class DepositController {

  constructor(private readonly depositService: DepositService) {}

  //add deposit information
  @Post()
  @ApiBody({type:CreateDepositDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('receipt',multerOptions))
  @Roles(roles.user)
  @UseGuards(CanAccess)
  async addDepositInfo(@Req() req:Request,@UploadedFile() receipt:Express.Multer.File,@Body(new ValidationPipe()) createDepositDto: CreateDepositDto) {
    try{
     return await this.depositService.addDepositInfo(req,receipt,createDepositDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  //get all deposit data
  @Get()
  @Roles(roles.admin)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  async getAllBankDeposit(){
    try{
      return await this.depositService.getAllBankDeposit()
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  // request deposit form QR
  @Post("qrreceipt")
  @Roles(roles.user)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  @ApiConsumes('multipart/form-data')
  @ApiBody({type:CreateQrDepositDto})
  @UseInterceptors(FileInterceptor('receipt',multerOptions))
  async addQrDeposit(@Req() req:Request,@UploadedFile() receipt:Express.Multer.File){
    try{
      return await this.depositService.addQrDeposit(req,receipt)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Patch("changeBankDepositStatus/:id")
  @Roles(roles.admin)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  async updateBankStatus(@Param('id', ParseUUIDPipe) id:string,@Body(new ValidationPipe({whitelist:true})) updateStatus:UpdateDepositDto){
    try{
      return await this.depositService.updateBankStatus(id,updateStatus)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  @Get("getQrDeposit")
  @Roles(roles.admin)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  async getQrDepositData(){
    try{
      return await this.depositService.getQrDepositData();
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  //get depost by id
  @Get('getQrDepositById/:id')
  @Roles(roles.admin,roles.user)
  @UseGuards(CanAccess)
  async getDepositById(@Param('id', ParseUUIDPipe) id:string){
    try{
      return await this.depositService.getDepositById(id);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  //update deposit by id
  @Patch("updateQrDepositStatus/:id")
  @Roles(roles.admin)
  @UseGuards(CanAccess)
  async updateQrStatus(@Param('id',ParseUUIDPipe) id:string,@Body(new ValidationPipe()) data:UpdateDepositDto){
    try{
      return await this.depositService.updateQrStatus(id,data)
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  
}
