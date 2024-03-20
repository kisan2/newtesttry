/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { TradeService } from './trade.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/Role.decorator';
import { roles } from 'src/util/roles';
import { CanAccess } from 'src/Guard/CanAccess.guard';
import { TimestampDto } from './dto/timestamp.dto';
import { tradeDto } from './dto/trade.dto';
import { Request } from 'express';

@Controller('trade')
@ApiTags("trade")
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('timestampRate')
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.admin)
  async timestampRate(@Body(new ValidationPipe()) timestampDto:TimestampDto){
    try{
      return await this.tradeService.timestamprate(timestampDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("timestamp")
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.admin,roles.user)
  async gettimestamp(){
    try{
      return await this.tradeService.gettimestamp()
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("buy")
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.user)
  async buyAndSell(@Body(new ValidationPipe()) TradeDto:tradeDto,@Req() req:Request){
    try{
      return await this.tradeService.buyAndSell(req,TradeDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('getAllTrade')
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.admin)
  async getAllTrade(){
    try{
      return await this.tradeService.getAllTrade()
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('getTradeByUser')
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.user)
  async getTradeByUser(@Req() req:Request){
    try{
      return await this.tradeService.getTradeByUser(req)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}
