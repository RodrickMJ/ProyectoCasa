import ActivityRepository from '../domain/ActivityRepository';
import { ActivityRequest } from '../domain/DTOS/ActivityRequest';
import { ActivityResponse } from '../domain/DTOS/ActivityResponse';

export default class LogActivityCase {
    constructor(private activityRepository: ActivityRepository) {}

    async logActivity(activity: ActivityRequest): Promise<ActivityResponse | null> {
        const activityLogged = await this.activityRepository.logActivity(activity);
        return activityLogged;
    }
}