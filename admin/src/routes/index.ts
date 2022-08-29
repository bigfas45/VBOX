import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  requireAuthProducer,
} from '@vboxdev/common';
import { Transaction } from '../models/transaction';
import _ from 'lodash';
import { UploadedFile } from 'express-fileupload';


const router = express.Router();

router.get('/api/movies/', async (req: Request, res: Response) => {

 


  res.send("user");
});



export { router as IndexrRouter };
