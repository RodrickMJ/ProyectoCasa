import { ActivityRequest} from './DTOS/ActivityRequest';
import { ActivityResponse } from './DTOS/ActivityResponse';

export default interface ActivityRepository {
    logActivity(activity: ActivityRequest): Promise<ActivityResponse | null>;
    getActivityById(id: string): Promise<ActivityResponse | null>;
    getAllActivities(): Promise<ActivityResponse[]>;
}