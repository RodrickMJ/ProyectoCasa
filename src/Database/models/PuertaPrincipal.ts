import { Document, Schema, model } from 'mongoose';

export interface IActivity extends Document {
    action: string;
    userId: string;
    timestamp: Date;
}

const activitySchema: Schema<IActivity> = new Schema({
    action: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ActivityModel = model<IActivity>('Activity', activitySchema);

export default ActivityModel;