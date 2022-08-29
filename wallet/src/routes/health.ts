import express, { Request, Response } from 'express';

const router = express.Router();

router.get(
  '/api/wallet/acuator/health',

 async (req: Request, res: Response) => {
    
 res.send("UP")
 console.log("UP")
  }
);

export { router as HealthRouter };
