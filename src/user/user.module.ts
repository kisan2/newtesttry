/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Amount } from 'src/Amount/entities/Amount.entities';


@Module({
  imports:[
  TypeOrmModule.forFeature([User,Amount]),
  JwtModule.register({
    secret:process.env.JWTSECRET,
    global:true,
    signOptions:{
      expiresIn:'1d',
    },
  })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
