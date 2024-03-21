/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ValidationPipe, ParseUUIDPipe, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/login-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer_g.config';
import { CanAccess } from 'src/Guard/CanAccess.guard';
import { Roles } from 'src/decorator/Role.decorator';
import { roles } from 'src/util/roles';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  //signup for user
  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateUserDto,
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'validId', maxCount: 1 },
    { name: 'profile', maxCount: 1 }
  ],multerOptions))
  async signup(@UploadedFiles() files: { validId?: Express.Multer.File[],profile?: Express.Multer.File[] },@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return await this.userService.signup(files,createUserDto);
      
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //login for user
  @Post("/login")
  async userlogin(@Body(new ValidationPipe()) userDto: UserLoginDto) {
    try {
      return await this.userService.userlogin(userDto)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  //get all user data
  @Get()
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.admin)
  async getAllUserData() {
    try {
      return await this.userService.getAllUserData();
    } catch (err) {
      throw new HttpException("something went wrong" + err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

    //get all deleted user data by id
    @Get("getDelData")
    @ApiBearerAuth("jwt")
    @UseGuards(CanAccess)
    @Roles(roles.admin)
    async getDelData(){
      try{
        return await this.userService.getDelData()
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    @Get("getAllUser")
    @ApiBearerAuth("jwt")
    @UseGuards(CanAccess)
    @Roles(roles.admin)
    async getAllData(){
      try{
        return await this.userService.getAllData()
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }


    //restore user data by id
    @Post("restore/:id")
    @ApiBearerAuth("jwt")
    @UseGuards(CanAccess)
    @Roles(roles.admin)
    async restore(@Param('id', ParseUUIDPipe) id: string) {
      try {
        return await this.userService.restore(id)
        
      } catch (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  //get user data by id
  @Get(':id')
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.user,roles.admin)
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.userService.getUserById(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  //update user by id
  @Patch(':id')
  @ApiBearerAuth("jwt")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserDto,
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'validId', maxCount: 1 },
    { name: 'profile', maxCount: 1 },
  ],multerOptions))
  @UseGuards(CanAccess)
  @Roles(roles.user,roles.admin)
  async updateUserById(@UploadedFiles() files: { validId?: Express.Multer.File[], profile?: Express.Multer.File[] },@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: CreateUserDto) {
    try {
      return  await this.userService.updateUserById(files,id, updateUserDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  //delete user by id
  @Delete(':id')
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.admin)
  async removeUserId(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.userService.removeUserId(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



}
