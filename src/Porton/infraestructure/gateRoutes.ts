import { Request, Response } from 'express';
import GateController from '../infraestructure/controllers/GateController';
import LogGateCase from '../aplication/LogGateCase';
import MongoGateRepository from '../infraestructure/MongoGateRepository';
import router from '../../Users/infrastructure/UserRouter';

const mongoGateRepository = new MongoGateRepository();
const logGateCase = new LogGateCase(mongoGateRepository);
const gateController = new GateController(logGateCase);

// Ahora puedes usar gateController en tus rutas u otros lugares
router.post('/gate', (req: Request, res: Response) => {
    gateController.logGate(req, res);
});

export default router;