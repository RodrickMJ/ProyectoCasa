import { Request, Response } from 'express';
import LogActivityCase from '../../aplication/LogActivityCase';
import ActivityRepository from '../../domain/ActivityRepository';
import { ActivityRequest } from '../../domain/DTOS/ActivityRequest';

export default class ActivityController {
    constructor(private logActivityCase: LogActivityCase) {}

    async logActivity(req: Request, res: Response) {
        const { action, userId } = req.body;

        const activity: ActivityRequest = {
            action,
            userId
        };

        try {
            const result = await this.logActivityCase.logActivity(activity);

            if (!result) {
                return res.status(500).json({
                    msg: "Error logging activity"
                });
            }

            return res.status(201).json({
                msg: "Activity logged successfully",
                data: result
            });
        } catch (error) {
            console.error("Error logging activity:", error);
            return res.status(500).json({
                msg: "Error logging activity"
            });
        }
    }
}