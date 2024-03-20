/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Roles } from 'src/decorator/Role.decorator';
import { roles } from 'src/util/roles';
import { CanAccess } from 'src/Guard/CanAccess.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CompanyInfoDto } from './dto/createcompanyInfo.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { createWalletDto } from './dto/createWallet.dto';

@Controller('company')
@ApiTags("CompanyInfo")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('postCompanyInfo')
  @Roles(roles.admin)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  @ApiBody({type:CompanyInfoDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    {name:'depositQr',maxCount:1},
    {name:"banner",maxCount:1},
    {name:"logo",maxCount:1}
  ],multerOptions))
  async addBasicInfo(@UploadedFiles() files:{ depositQr?: Express.Multer.File[], banner?: Express.Multer.File[],logo?: Express.Multer.File[] },@Body(new ValidationPipe({whitelist: true})) companyInfo:CompanyInfoDto){
    try{
      return await this.companyService.addBasicInfo(files,companyInfo);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('postWalletInfo')
  @Roles(roles.admin)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  @ApiBody({type:createWalletDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('depositQr',multerOptions))
  async addWalletInfo(@UploadedFile() depositQr:Express.Multer.File,@Body(new ValidationPipe({whitelist: true})) walletInfo:createWalletDto){
    try{
      return await this.companyService.addWalletInfo(depositQr,walletInfo);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('getCompanyInfo')
  async getCompanyInfo(){
    try{
      return await this.companyService.getCompanyInfo()
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('getWalletInfo')
  async getWalletInfo(){
    try{
      return await this.companyService.getWalletInfo()
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
