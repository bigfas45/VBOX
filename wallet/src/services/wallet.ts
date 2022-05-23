import mongoose from 'mongoose';
import { UserType } from '@vboxdev/common';
import { Wallet } from '../models/wallet';

export class WalletService {
    static async create(user: any, userType: UserType, telephone: string) {
        const { Producer, Customer } = UserType;
    if (userType === Producer || userType === Customer) {
      const wallet = await new Wallet(
        {
          walletNumber: telephone,
          user: mongoose.Types.ObjectId(user),
        }
      ).save();
    }
    } 

    static async credit(user: any, amount: number, walletNumber: string) {
      const updatedWallet = await Wallet.findOneAndUpdate(
        { user, walletNumber },
        { $inc: { balance: amount } },
        { new: true },
    );

    return true;
    }
}
