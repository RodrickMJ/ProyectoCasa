import { Request, Response } from 'express';
import LogGateCase from '../../aplication/LogGateCase';
import { GateRequest } from '../../domain/DTOS/GateRequest';

export default class GateController {
    constructor(private logGateCase: LogGateCase) {}

    async logGate(req: Request, res: Response) {
        const { action, userId } = req.body;

        const gate: GateRequest = {
            action,
            userId
        };

        try {
            const result = await this.logGateCase.logGate(gate);

            if (!result) {
                return res.status(500).json({
                    msg: "Error logging gate"
                });
            }

            return res.status(201).json({
                msg: "Gate logged successfully",
                data: result
            });
        } catch (error) {
            console.error("Error logging gate:", error);
            return res.status(500).json({
                msg: "Error logging gate"
            });
        }
    }
}