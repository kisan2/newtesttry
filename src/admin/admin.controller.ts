/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Patch
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { changePassword } from './dto/ChangeAdminPassword.dto';


@Controller('admin')
@ApiTags('admin')
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) createAdminDto:CreateAdminDto) {
    try{
      return await this.adminService.signup(createAdminDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) createAdminDto:CreateAdminDto){
    try{
      return await this.adminService.login(createAdminDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Patch("changepassword")
 async changeAdminPassword(@Body(new ValidationPipe()) adminDto:changePassword ){
  try{
    return await this.adminService.changePassword(adminDto)
  }catch(err){
    throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
  }
 }
}
