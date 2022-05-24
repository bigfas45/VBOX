import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '@vboxdev/common';

export const validatorHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array({ onlyFirstError: true });
            const errorMessage = errorInfo[0].msg;

            throw new BadRequestError(errorMessage);
        }

        next();
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Something went wrong');
    }
};
