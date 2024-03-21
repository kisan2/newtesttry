import { BaseEntity } from '../../entity/base_Entity';
import { User } from 'src/user/entities/user.entity';
export declare class Amount extends BaseEntity {
    balance: string;
    user: User;
}
