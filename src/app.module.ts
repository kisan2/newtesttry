/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseConnection } from './config/database.config';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { DepositModule } from './deposit/deposit.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TradeModule } from './trade/trade.module';
import { AmountModule } from './Amount/Amount.module';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    UserModule,
    AdminModule,
    WithdrawalModule,
    DepositModule,
    DatabaseConnection,
    ConfigModule.forRoot({isGlobal:true}),
    JwtModule.register({
      secret:"sdfksfksjhdfkshdkfskhfdkskdfksjhdf",
      global:true,
      signOptions:{
          expiresIn:"1d"
      }
  }),
    CacheModule.register({isGlobal:true}),
    AmountModule,
    TradeModule,
    CompanyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
