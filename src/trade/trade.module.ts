/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { timestamprate } from '../entity/time_stamprate';
import { Amount } from '../Amount/entities/Amount.entities';
import { User } from '../user/entities/user.entity';
import { Trade } from './entities/trade.entities';

@Module({
  imports:[TypeOrmModule.forFeature([User,timestamprate,Amount,Trade])],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
