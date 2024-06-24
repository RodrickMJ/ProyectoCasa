
import { Document, Schema, model } from 'mongoose';

export interface IGate extends Document {
    type: string; 
    action: string;
    userId: string;
    timestamp: Date;
}

const gateSchema: Schema<IGate> = new Schema({
    type: { type: String, default: 'gate' }, 
    action: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const GateModel = model<IGate>('Gate', gateSchema);

export default GateModel;
