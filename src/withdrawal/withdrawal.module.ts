/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdrawal } from './entities/withdrawal.entity';
import { User } from 'src/user/entities/user.entity';
import { Amount } from 'src/Amount/entities/Amount.entities';
import { USDTWithdrawal } from './entities/usdtWithdrawal.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Withdrawal,User,Amount,USDTWithdrawal])],
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
})
export class WithdrawalModule {}
