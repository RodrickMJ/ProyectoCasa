import UserModel, { IUser } from '../../Database/models/UserModel';
import { UserCreateRequest } from '../domain/DTOS/UserRequest';
import userEntry from '../domain/UserEntry';
import UserRepository from '../domain/UserRepository';

export default class MongoUserRepository implements UserRepository {
    constructor() { }

    async create(user: UserCreateRequest): Promise<userEntry | null> {
        try {
            const createdUser = new UserModel(user);
            const result = await createdUser.save();

            const response: userEntry = {
                id: result._id as unknown as number, // Convertir _id a number (asumiendo que es un número válido)
                nombre: result.nombre,
                username: result.username,
                email: result.email,
                password: result.password,
                rol: user.rol || '' // Utilizar un valor por defecto en caso de que rol sea null
            };

            return response;

        } catch (error) {
            console.log("Ha ocurrido un error durante la creación del usuario.");
            console.error(error);
            return null;
        }
    }

    async getById(id: string): Promise<userEntry | null> {
        try {
            const user = await UserModel.findById(id).exec();

            if (!user) {
                return null;
            }

            const response: userEntry = {
                id: user._id as unknown as number, // Convertir _id a number (asumiendo que es un número válido)
                nombre: user.nombre,
                username: user.username,
                email: user.email,
                password: user.password,
                rol: user.rol || '' // Utilizar un valor por defecto en caso de que rol sea null
            };

            return response;

        } catch (error) {
            console.log("Ha ocurrido un error durante la obtención del usuario.");
            console.error(error);
            return null;
        }
    }
}
