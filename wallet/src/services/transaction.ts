import { Types } from 'mongoose';
import { Transaction } from "../models/transaction";

export class TransactionService {
    static async getAll(userId: string, walletNumber: string, sortingOptions: any) {
        const transactions = await Transaction.find(
            {
                user: new Types.ObjectId(userId),
                walletNumber,
            },
            sortingOptions,
        )
    

    const message = transactions.length > 0 ? 'Transactions fetched successfully' : 'No transactions yet'; 

    return {
        status: 'success',
        data: transactions,
        message,
    }
} 
}