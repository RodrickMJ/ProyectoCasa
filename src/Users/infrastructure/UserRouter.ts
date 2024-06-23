import express from 'express';
import { createUserController, byIdUserController } from './dependencies';
import verifyToken from '../infrastructure/middleware/VerifyToken'; 
import AuthController from './controllers/AuthController';
import AuthenticateUser from '../aplication/AuthenticateUser'; 
import AuthService from '../aplication/Services/AuthService';
import MongoUserRepository from "./MongoUserRepository";

const router = express.Router();
const authService = new AuthService(process.env.SECRET_JWT || 'defaultSecretKey');

const userRepository = new MongoUserRepository();
const authenticateUser = new AuthenticateUser(userRepository, authService);

router.use('/users', verifyToken(authService));
router.use('/auth', AuthController(authenticateUser, authService));
router.post('/', createUserController.run.bind(createUserController));
router.get('/:id', byIdUserController.run.bind(byIdUserController));


export default router;