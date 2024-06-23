import ActivityModel, { IActivity }  from '../../Database/models/PuertaPrincipal';
import { ActivityRequest } from '../domain/DTOS/ActivityRequest';
import { ActivityResponse } from '../domain/DTOS/ActivityResponse';
import ActivityRepository from '../domain/ActivityRepository';

export default class MongoActivityRepository implements ActivityRepository {
    async logActivity(activity: ActivityRequest): Promise<ActivityResponse | null> {
        try {
            const createdActivity = new ActivityModel({
                action: activity.action,
                userId: activity.userId,
                timestamp: new Date()
            });

            const result = await createdActivity.save();

            const response: ActivityResponse = {
                id: result._id as unknown as number,
                action: result.action,
                userId: result.userId,
                timestamp: result.timestamp
            };

            return response;
        } catch (error) {
            console.error("Error logging activity:", error);
            return null;
        }
    }

    async getActivityById(id: string): Promise<ActivityResponse | null> {
        try {
            const activity = await ActivityModel.findById(id).exec();

            if (!activity) {
                return null;
            }

            const response: ActivityResponse = {
                id: activity._id as unknown as number,
                action: activity.action,
                userId: activity.userId,
                timestamp: activity.timestamp
            };

            return response;
        } catch (error) {
            console.error("Error fetching activity by ID:", error);
            return null;
        }
    }

    async getAllActivities(): Promise<ActivityResponse[]> {
        try {
            const activities = await ActivityModel.find().exec();

            const response: ActivityResponse[] = activities.map(activity => ({
                id: activity._id as unknown as number,
                action: activity.action,
                userId: activity.userId,
                timestamp: activity.timestamp
            }));

            return response;
        } catch (error) {
            console.error("Error fetching all activities:", error);
            return [];
        }
    }
}