import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { Request } from 'express';
import { UpdateUSDTWithdrawalDto } from './dto/updateUSDTwithdrawal.dto';
import { CreateUSDTWithdrawalDto } from './dto/createUSDTwithdrawal.dto';
export declare class WithdrawalController {
    private readonly withdrawalService;
    constructor(withdrawalService: WithdrawalService);
    requestForWithdraww(req: Request, withdrawalDto: CreateWithdrawalDto): Promise<{
        message: string;
    }>;
    requestUSDTWithdraww(req: Request, USDTwithdrawal: CreateUSDTWithdrawalDto): Promise<{
        message: string;
    }>;
    updateBankStatus(id: string, data: UpdateWithdrawalDto): Promise<{
        message: string;
    }>;
    updateUSDTStatus(id: string, data: UpdateUSDTWithdrawalDto): Promise<{
        message: string;
    }>;
    getAllwithdrwal(): Promise<{
        data: import("./entities/withdrawal.entity").Withdrawal[];
    }>;
    getAllUSDTwithdrwal(): Promise<{
        data: import("./entities/usdtWithdrawal.entity").USDTWithdrawal[];
    }>;
}
