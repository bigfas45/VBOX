import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { PaymentService } from '../services/payment';
import { LogService } from '../services/log';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  requireAuthProducer,
  validateRequest
} from '@vboxdev/common';
import { WalletService } from '../services/wallet';
import { paymentValidator } from '../validation/paymentValidator';
import { validatorHandler } from '../validation/validationHandler';

const router = express.Router();

const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY!;

router.post(
  '/api/wallet/payments/movies',
  requireAuth,
  paymentValidator.moviePayment,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, id: userId } = req.currentUser!;
    const { quantity, movieId } = req.body;
    const { status, message, data } = await PaymentService.moviePayment({
      email,
      userId,
      quantity,
      movieId,
    });

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    return res.status(200).json({ data, message });
  }
);

router.post('/api/wallet/payments/webhook', async function (req, res) {
  try {
    var hash = crypto
      .createHmac('sha512', paystackSecretKey)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (!req.headers['x-paystack-signature']) {
      await LogService.create({
        description: 'No hash Provided',
        payload: req.body,
        type: 'transaction',
      });
      return res.status(401).json({ message: 'No hash provided', status: 'failed'});
    }

    if (hash !== req.headers['x-paystack-signature']) {
      await LogService.create({
        description: 'Invalid hash Provided',
        payload: req.body,
        type: 'transaction',
      });
      return res.status(401).json({ message: 'Invalid hash provided', status: 'failed'});
    }

    const { status: paymentStatus, id, reference, customer } = req.body.data;
    const { data, status, message } = await PaymentService.confirmTransaction(
      reference,
      paymentStatus,
      req.body
    );
    if (status === 'failed') {
      await LogService.create({
        payload: req.body,
        description: message,
        type: 'transaction',
      });
    }

    if (data && data.status === 'success') {
      const { user, amount, walletNumber } = data;
      await WalletService.credit(user, amount, walletNumber);
    }

    return res.status(200).json({ status: 'success', message: 'Okay' });
  } catch (error) {
      console.log(error)
    throw new BadRequestError('Something went wrong');
  }
});

export { router as PaymentRouter };
