import { Types } from "mongoose";

export interface IPaymentDetails {
    email: string;
    amount: number;
}

export interface IMoviePaymentDetails {
    email: string; 
    quantity: string;
    movieId: string; 
    userId: string;
}

export interface ILogDetails {
    description: string;
    payload: string;
    type: string;
}
