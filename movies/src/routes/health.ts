import express, { Request, Response } from 'express';
import { currentUser, NotFoundError } from '@vboxdev/common';

const router = express.Router();





router.get(
  '/api/movies/acuator/health',

 async (req: Request, res: Response) => {
    
 res.send("UP")
 console.log("UP")
  }
);

export { router as HealthRouter };
