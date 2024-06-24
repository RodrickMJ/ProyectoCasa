import GateModel, { IGate } from '../../Database/models/Porton';
import { GateRequest } from '../domain/DTOS/GateRequest';
import { GateResponse } from '../domain/DTOS/GateResponse';
import GateRepository from '../domain/GateRepository';

export default class MongoGateRepository implements GateRepository {
    async logGate(gate: GateRequest): Promise<GateResponse | null> {
        try {
            const createdGate = new GateModel({
                action: gate.action,
                userId: gate.userId,
                timestamp: new Date()
            });

            const result = await createdGate.save();

            const response: GateResponse = {
                id: result._id as unknown as number,
                action: result.action,
                userId: result.userId,
                timestamp: result.timestamp
            };

            return response;
        } catch (error) {
            console.error("Error logging gate:", error);
            return null;
        }
    }

    async getGateById(id: string): Promise<GateResponse | null> {
        try {
            const gate = await GateModel.findById(id).exec();

            if (!gate) {
                return null;
            }

            const response: GateResponse = {
                id: gate._id as unknown as number,
                action: gate.action,
                userId: gate.userId,
                timestamp: gate.timestamp
            };

            return response;
        } catch (error) {
            console.error("Error fetching gate by ID:", error);
            return null;
        }
    }

    async getAllGates(): Promise<GateResponse[]> {
        try {
            const gates = await GateModel.find().exec();

            const response: GateResponse[] = gates.map(gate => ({
                id: gate._id as unknown as number,
                action: gate.action,
                userId: gate.userId,
                timestamp: gate.timestamp
            }));

            return response;
        } catch (error) {
            console.error("Error fetching all gates:", error);
            return [];
        }
    }
}