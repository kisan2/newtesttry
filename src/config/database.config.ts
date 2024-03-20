/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { Withdrawal } from '../withdrawal/entities/withdrawal.entity';
import { Deposit } from '../deposit/entities/deposit.entity';
import { ConfigService } from '@nestjs/config';
import { Trade } from 'src/trade/entities/trade.entities';
import { Amount } from 'src/Amount/entities/Amount.entities';
import { timestamprate } from 'src/entity/timestamprate';
import { QrDeposit } from 'src/deposit/entities/qrdeposit.entity';
import { CompanyInfo } from 'src/company/entities/CompanyBasicInfo.entity';
import { walletInfo } from 'src/company/entities/wallet.entity';
import { USDTWithdrawal } from 'src/withdrawal/entities/usdtWithdrawal.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: "yh3.domaininnepal.com",
        port: configService.get<number>('DATABASE_PORT'),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [Admin,User,Withdrawal,Deposit,Amount,Trade,timestamprate,QrDeposit,CompanyInfo,walletInfo,USDTWithdrawal],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseConnection {}
