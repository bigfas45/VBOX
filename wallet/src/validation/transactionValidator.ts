import { query } from 'express-validator';

export const transactionValidator = {
  allTransactions: [
    query('movieId')
      .optional()
      .trim()
      .isMongoId()
      .withMessage('Movie ID is required, Please pass valid Movie ID'),
    query('limit')
      .optional()
      .isFloat({ min: 1 })
      .withMessage('Limit must be a number, a minimum of 1'),
    query('page').optional().isFloat({ min: 1 }).withMessage('Page must be a number, minimum of 1'),
    query('startDate')
      .optional()
      .isDate()
      .withMessage('Enter a valid start date'),
    query('endDate').optional().isDate().withMessage('Enter a valid end date'),
    query('movieType')
      .optional()
      .isString()
    .withMessage('Enter a valid movie type')
  ],
};

transactionValidator;
