import { check }  from 'express-validator';

export const paymentValidator = {
    moviePayment: [
        check('movieId')
            .not()
            .isEmpty({ ignore_whitespace: true })
            .withMessage('Movie ID is required')
            .trim()
            .isMongoId()
            .withMessage('Please pass valid Movie ID'),
        check('quantity')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Quantity must be a number, a minimum of 1'),
    ],    
};

paymentValidator;
