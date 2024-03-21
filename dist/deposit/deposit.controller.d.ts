import { DepositService } from './deposit.service';
import { UpdateDepositDto } from './dto/update-deposit.dto';
export declare class DepositController {
    private readonly depositService;
    constructor(depositService: DepositService);
    getAllBankDeposit(): Promise<{
        result: import("./entities/deposit.entity").Deposit[];
    }>;
    updateBankStatus(id: string, updateStatus: UpdateDepositDto): Promise<{
        message: string;
    }>;
    getQrDepositData(): Promise<{
        data: import("./entities/qrdeposit.entity").QrDeposit[];
    }>;
    getDepositById(id: string): Promise<{
        result: import("./entities/deposit.entity").Deposit;
    }>;
    updateQrStatus(id: string, data: UpdateDepositDto): Promise<{
        message: string;
    }>;
}
