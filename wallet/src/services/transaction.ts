import { Types } from 'mongoose';
import { Transaction } from "../models/transaction";

export class TransactionService {
    static async getAll(fetchParams: any) {
        const { filterOptions, pagination } = fetchParams;
        const { skip, limit, page } = pagination;
        const transactions = await Transaction.find(
           filterOptions,
        )
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1});

    const message = transactions.length > 0 ? 'Transactions fetched successfully' : 'No transactions yet'; 

    return {
        status: 'success',
        data: {
            meta: {
                count: transactions.length,
                page,
                limit,
            },
            transactions,
        },
        message,
    }
} 
}