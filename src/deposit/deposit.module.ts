/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { User } from '../user/entities/user.entity';
import { QrDeposit } from './entities/qrdeposit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Deposit,User,QrDeposit])],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
