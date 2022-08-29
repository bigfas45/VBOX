import mongoose from 'mongoose';
import { UserType, BadRequestError } from '@vboxdev/common';
import { Wallet } from '../models/wallet';
import { WalletCreatedPublisher } from '../events/publisher/wallet-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { WalletUpdatedPublisher } from '../events/publisher/wallet-updated-publisher';

export class WalletService {
  static async create(user: any, userType: UserType, telephone: string) {
    const { Producer, Customer } = UserType;
    if (userType === Producer || userType === Customer) {
      const wallet = await new Wallet({
        walletNumber: telephone,
        user: new mongoose.Types.ObjectId(user),
      }).save();

      // create wallet publisher

      await new WalletCreatedPublisher(natsWrapper.client).publish({
        id: wallet.id,
        version: wallet.version,
        walletNumber: wallet.walletNumber,
        balance: wallet.balance,
        user: wallet.user,
      });
    }
  }

  static async credit(user: any, amount: number, walletNumber: string) {
    //   const updatedWallet = await Wallet.findOneAndUpdate(
    //     { user, walletNumber },
    //     { $inc: { balance: amount } },
    //     { new: true },
    // );

    const updatedWallet = await Wallet.findOne({
      user,
      walletNumber,
    });

    if (!updatedWallet) {
      throw new BadRequestError('Wallet is empty');
    }

    if (amount) {
      updatedWallet.set({ balance: amount + updatedWallet.balance });
    }

    await updatedWallet.save();


    // update wallet publisher

    await new WalletUpdatedPublisher(natsWrapper.client).publish({
      id: updatedWallet.id,
      version: updatedWallet.version,
      walletNumber: updatedWallet.walletNumber,
      balance: updatedWallet.balance,
      user: updatedWallet.user,
    });

    return true;
  }
}
