import { TradeService } from './trade.service';
import { TimestampDto } from './dto/timestamp.dto';
import { tradeDto } from './dto/trade.dto';
import { Request } from 'express';
export declare class TradeController {
    private readonly tradeService;
    constructor(tradeService: TradeService);
    timestampRate(timestampDto: TimestampDto): Promise<{
        message: string;
    }>;
    gettimestamp(): Promise<{
        result: import("../entity/time_stamprate").timestamprate[];
    }>;
    buyAndSell(TradeDto: tradeDto, req: Request): Promise<{
        message: string;
    }>;
    getAllTrade(): Promise<{
        trade: import("./entities/trade.entities").Trade[];
    }>;
    getTradeByUser(req: Request): Promise<{
        trade: import("./entities/trade.entities").Trade;
    }>;
}
