import express from 'express';
import { createUserController, byIdUserController } from './dependencies';
import verifyToken from '../infrastructure/middleware/VerifyToken'; 
import AuthController from '../infrastructure/controllers/AuthController'; 
import AuthenticateUser from '../aplication/AuthenticateUser'; 
import AuthService from '../aplication/Services/AuthService';
import MongoUserRepository from "./MongoUserRepository";

const router = express.Router();
const authService = new AuthService(process.env.SECRET_JWT || 'defaultSecretKey');

const userRepository = new MongoUserRepository();
const authenticateUser = new AuthenticateUser(userRepository, authService);

// Middleware para verificar token en rutas protegidas de usuarios
router.use('/users', verifyToken(authService));

// Rutas de autenticación
router.use('/auth', AuthController(authenticateUser, authService));

// Rutas de usuarios
router.post('/users', createUserController.run.bind(createUserController));
router.get('/users/:id', byIdUserController.run.bind(byIdUserController));


export default router;
