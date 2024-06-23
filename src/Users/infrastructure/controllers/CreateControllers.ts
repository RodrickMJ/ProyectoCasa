import { Request, Response } from 'express';
import CreateUserCase from '../../aplication/CreateUseCase';
import { UserCreateRequest, UserRole } from '../../domain/DTOS/UserRequest';

export default class CreateUserController {
    constructor (readonly createUserCase: CreateUserCase) {}

    async run(req: Request, res: Response) {
        const { username, email, password, nombre, rol } = req.body;

        const user: UserCreateRequest = {
            username,
            email,
            password,
            nombre,
            rol: rol as UserRole ?? null, // Asegúrate de castear user.rol como UserRole o asignar null si es undefined
        };

        const result = await this.createUserCase.run(user);
        
        if (!result) {
            return res.status(500).json({
                data: result,
                msg: "Error al crear un usuario"
            });
        }

        return res.status(201).json({
            data: result,
            msg: "Usuario creado con éxito"
        });
    }
}
