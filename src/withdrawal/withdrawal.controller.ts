/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Patch, ValidationPipe, HttpException, HttpStatus, UseGuards, Req, Get, ParseUUIDPipe, Param } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { Roles } from 'src/decorator/Role.decorator';
import { roles } from 'src/util/roles';
import { CanAccess } from 'src/Guard/CanAccess.guard';
import { Request } from 'express';
import { UpdateUSDTWithdrawalDto } from './dto/updateUSDTwithdrawal.dto';
import { CreateUSDTWithdrawalDto } from './dto/createUSDTwithdrawal.dto';

@Controller('withdrawal')
@ApiTags('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}
  
  @Post()
  @UseGuards(CanAccess)
  @Roles(roles.user)
  @ApiBearerAuth("jwt")
  async requestForWithdraww(@Req() req:Request,@Body(new ValidationPipe()) withdrawalDto :CreateWithdrawalDto){
    try{
      return await this.withdrawalService.requestBankWithdraww(req,withdrawalDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("usdtWithdrawalReq")
  @UseGuards(CanAccess)
  @Roles(roles.user)
  @ApiBearerAuth("jwt")
  async requestUSDTWithdraww(@Req() req:Request,@Body(new ValidationPipe()) USDTwithdrawal :CreateUSDTWithdrawalDto){
    try{
      return await this.withdrawalService.requestUSDTWithdraww(req,USDTwithdrawal);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  @Patch("updateBankStatus/:id")
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  @Roles(roles.admin)
  async updateBankStatus(@Param('id', ParseUUIDPipe) id:string,@Body(new ValidationPipe()) data:UpdateWithdrawalDto){
    try{
      return  await this.withdrawalService.updateBankStatus(id,data)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Patch("updateUSDTStatus/:id")
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  @Roles(roles.admin)
  async updateUSDTStatus(@Param('id', ParseUUIDPipe) id:string,@Body(new ValidationPipe()) data:UpdateUSDTWithdrawalDto){
    try{
      return await this.withdrawalService.updateUSDTStatus(id,data)
      
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Get("getAllData")
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  @Roles(roles.admin)
  async getAllwithdrwal(){
    try{
      return await this.withdrawalService.getAllwithdrwal()
      
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('GetAllUSDTdata')
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  @Roles(roles.admin)
  async getAllUSDTwithdrwal(){
    try{
      return await this.withdrawalService.getAllUSDTwithdrwal()
      
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}
