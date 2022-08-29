import express, { Request, Response } from 'express'
import { TransactionService } from '../services/transaction';
import {
  BadRequestError,
  requireAuth,
  validateRequest
} from '@vboxdev/common';
import { transactionValidator } from '../validation/transactionValidator';
import { validatorHandler } from '../validation/validationHandler';
import { QueryBuilder } from '../middlewares/queryBuilders';

const router = express.Router();


router.get(
  '/api/wallet/transactions',
  requireAuth,
  QueryBuilder.allTransactions,
  transactionValidator.allTransactions,
  validateRequest,
  async (req: Request, res: Response) => {
    
    const { status, message, data } = await TransactionService.getAll(res.locals.fetchParams);

    if (status === 'failed') {
      throw new BadRequestError(message);
    }

    return res.status(200).json({ data, message });
  }
);

export { router as TransactionRouter };
