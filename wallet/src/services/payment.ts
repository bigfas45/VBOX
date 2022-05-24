import mongoose from 'mongoose';
import axios from 'axios';
import { UserType } from '@vboxdev/common';
import { Wallet } from '../models/wallet';
import { Movie } from '../models/movies';
import { Transaction } from '../models/transaction';
import { Log } from '../models/log';
import { IPaymentDetails, IMoviePaymentDetails } from '../types/types';

const paystackBaseURL = process.env.PAYSTACK_BASE_URL;

export class PaymentService {
    static async getPaymentLink(details: IPaymentDetails) {
        const { email, amount } = details;
        const result = await axios.post(
            `${paystackBaseURL}/transaction/initialize`,
            { email, amount },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            },
        );
        return {
            status: 'success',
            data: result.data.data,
        };
    }

    static async moviePayment(details: IMoviePaymentDetails) {
        const { email, quantity, movieId, userId } = details;
        const refinedEmail = email.toLowerCase();
        const movie = await Movie.findOne({ _id: movieId }).lean();
        const wallet = await Wallet.findOne({ user: mongoose.Types.ObjectId(userId) }).select('walletNumber').lean();

        if (!movie) {
            return {
                status: 'failed',
                message: 'Movie not found',
            }
        }

        const price = 100
        const parsedQuantity = quantity ? parseInt(quantity) : 1;
        const totalAmountInKobo = parsedQuantity * price;

        const paymentLink = await this.getPaymentLink({
            email: refinedEmail,
            amount: totalAmountInKobo,
        });

        await Transaction.create({
            walletNumber: wallet?.walletNumber,
            user: mongoose.Types.ObjectId(userId),
            itemId: movie._id,
            purchaserEmail: refinedEmail,
            description: movie.title,
            extraDescription: movie.genre,
            transactionReference: paymentLink.data.reference,
            amount: totalAmountInKobo,
            quantity: parsedQuantity
        });

        return {
            status: 'success',
            data: paymentLink,
            message: 'Payment link generated successfully',
        };
    }

    static async confirmTransaction(transactionReference: string, status: string, payload: any) {
        const transaction = await Transaction.findOne({ transactionReference, status: 'pending' });

        if (!transaction) {
            return {
                status: 'failed',
                message: 'Transaction already updated'
            };
        }

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { transactionReference },
            { $set: { status, meta: JSON.stringify(payload) } },
            { new: true },
        );

        return {
            status: 'success',
            data: updatedTransaction,
            message: 'Transaction updated',
        };
    }
}
