/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { Withdrawal } from '../withdrawal/entities/withdrawal.entity';
import { Deposit } from '../deposit/entities/deposit.entity';
import { ConfigService } from '@nestjs/config';
import { Trade } from '../trade/entities/trade.entities';
import { Amount } from '../Amount/entities/Amount.entities';
import { timestamprate } from '../entity/time_stamprate';
import { QrDeposit } from '../deposit/entities/qrdeposit.entity';
import { CompanyInfo } from '../company/entities/CompanyBasicInfo.entity';
import { walletInfo } from '../company/entities/wallet.entity';
import { USDTWithdrawal } from '../withdrawal/entities/usdtWithdrawal.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: "yh3.domaininnepal.com",
        port: 3306,
        username: "hubitcom_tushar",
        password: "Tushar12345",
        database: "hubitcom_crypto",
        entities: [Admin,User,Withdrawal,Deposit,Amount,Trade,timestamprate,QrDeposit,CompanyInfo,walletInfo,USDTWithdrawal],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseConnection {}
