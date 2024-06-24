import { GateRequest } from './DTOS/GateRequest';
import { GateResponse } from './DTOS/GateResponse';

export default interface GateRepository {
    logGate(gate: GateRequest): Promise<GateResponse | null>;
    getGateById(id: string): Promise<GateResponse | null>;
    getAllGates(): Promise<GateResponse[]>;
}