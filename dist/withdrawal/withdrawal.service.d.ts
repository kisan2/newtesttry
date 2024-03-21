import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { Withdrawal } from './entities/withdrawal.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { Amount } from 'src/Amount/entities/Amount.entities';
import { USDTWithdrawal } from './entities/usdtWithdrawal.entity';
import { UpdateUSDTWithdrawalDto } from './dto/updateUSDTwithdrawal.dto';
import { CreateUSDTWithdrawalDto } from './dto/createUSDTwithdrawal.dto';
export declare class WithdrawalService {
    private withdrawRepo;
    private userRepo;
    private amount;
    private USDTRepo;
    constructor(withdrawRepo: Repository<Withdrawal>, userRepo: Repository<User>, amount: Repository<Amount>, USDTRepo: Repository<USDTWithdrawal>);
    updateUSDTStatus(id: string, data: UpdateUSDTWithdrawalDto): Promise<{
        message: string;
    }>;
    getAllUSDTwithdrwal(): Promise<{
        data: USDTWithdrawal[];
    }>;
    requestUSDTWithdraww(req: any, USDTwithdrawal: CreateUSDTWithdrawalDto): Promise<{
        message: string;
    }>;
    getAllwithdrwal(): Promise<{
        data: Withdrawal[];
    }>;
    updateBankStatus(id: string, data: UpdateWithdrawalDto): Promise<{
        message: string;
    }>;
    requestBankWithdraww(req: any, withdrawalDto: CreateWithdrawalDto): Promise<{
        message: string;
    }>;
}
