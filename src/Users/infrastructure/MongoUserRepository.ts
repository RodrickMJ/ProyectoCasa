import UserModel from '../../Database/models/UserModel';
import { UserCreateRequest, UserRole } from '../domain/DTOS/UserRequest';
import userEntry from '../domain/UserEntry';
import UserRepository from '../domain/UserRepository';
import { rolePermissions, Role } from './Permissions';

export default class MongoUserRepository implements UserRepository {
    constructor() {}

    async create(user: UserCreateRequest): Promise<userEntry | null> {
        try {
            // Validar que user.rol sea una cadena y que exista en rolePermissions
            if (typeof user.rol !== 'string' || !Object.prototype.hasOwnProperty.call(rolePermissions, user.rol)) {
                throw new Error(`Invalid role: ${user.rol}`);
            }

            // Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
            const existingUser = await UserModel.findOne({
                $or: [
                    { username: user.username },
                    { email: user.email }
                ]
            });

            if (existingUser) {
                console.log(`User with username ${user.username} or email ${user.email} already exists`);
                return null; // Retorna null o maneja el caso de usuario existente como desees
            }

            const createdUser = new UserModel({
                username: user.username,
                email: user.email,
                password: user.password,
                nombre: user.nombre,
                rol: user.rol as Role,
                permissions: rolePermissions[user.rol as Role] || []
            });

            const result = await createdUser.save();

            const response: userEntry = {
                id: result._id as unknown as number,
                nombre: result.nombre,
                username: result.username,
                email: result.email,
                password: result.password,
                rol: result.rol as Role,
                permissions: result.permissions || []
            };

            return response;
        } catch (error) {
            console.log("Error creating user:");
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
                id: user._id as unknown as number,
                nombre: user.nombre,
                username: user.username,
                email: user.email,
                password: user.password,
                rol: user.rol as Role,
                permissions: user.permissions || []
            };

            return response;
        } catch (error) {
            console.log("Error fetching user by ID:");
            console.error(error);
            return null;
        }
    }

    async findByUsername(username: string): Promise<userEntry | null> {
        try {
            const user = await UserModel.findOne({ username }).exec();

            if (!user) {
                return null;
            }

            const response: userEntry = {
                id: user._id as unknown as number,
                nombre: user.nombre,
                username: user.username,
                email: user.email,
                password: user.password,
                rol: user.rol as Role,
                permissions: user.permissions || []
            };

            return response;
        } catch (error) {
            console.log("Error fetching user by username:");
            console.error(error);
            return null;
        }
    }
}
