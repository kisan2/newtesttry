import { TimestampDto } from './dto/timestamp.dto';
import { timestamprate } from '../entity/time_stamprate';
import { Repository } from 'typeorm';
import { tradeDto } from './dto/trade.dto';
import { Amount } from '../Amount/entities/Amount.entities';
import { User } from '../user/entities/user.entity';
import { Trade } from './entities/trade.entities';
export declare class TradeService {
    private timestampRepo;
    private amountRepo;
    private userRepo;
    private tradeRepo;
    constructor(timestampRepo: Repository<timestamprate>, amountRepo: Repository<Amount>, userRepo: Repository<User>, tradeRepo: Repository<Trade>);
    getTradeByUser(req: any): Promise<{
        trade: Trade;
    }>;
    getAllTrade(): Promise<{
        trade: Trade[];
    }>;
    buyAndSell(req: any, TradeDto: tradeDto): Promise<{
        message: string;
    }>;
    gettimestamp(): Promise<{
        result: timestamprate[];
    }>;
    timestamprate(timestampDto: TimestampDto): Promise<{
        message: string;
    }>;
}
