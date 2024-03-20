/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AmountService } from './Amount.service';
import { AmountController } from './Amount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amount } from './entities/Amount.entities';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Amount,User])],
  controllers: [AmountController],
  providers: [AmountService],
})
export class AmountModule {}
