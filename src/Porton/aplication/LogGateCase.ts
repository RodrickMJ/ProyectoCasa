import GateRepository from '../domain/GateRepository';
import { GateRequest } from '../domain/DTOS/GateRequest';
import { GateResponse } from '../domain/DTOS/GateResponse';

export default class LogGateCase {
    constructor(private gateRepository: GateRepository) {}

    async logGate(gate: GateRequest): Promise<GateResponse | null> {
        const gateLogged = await this.gateRepository.logGate(gate);
        return gateLogged;
    }
}