import { Log } from "../models/log";
import { ILogDetails } from "../types/types";

export class LogService {
    static async create(details: ILogDetails) {
        const {
            description,
            payload,
            type,
        } = details;

        const payloadObject = JSON.stringify(payload)

        await Log.create({
            description,
            payload: payloadObject,
            type,
        });

        return true;
    }
}