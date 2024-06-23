import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { rolePermissions, Role } from '../Users/infrastructure/Permissions';
import MongoUserRepository from '../Users/infrastructure/MongoUserRepository';
import CreateUserCase from '../Users/aplication/CreateUseCase';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/homePro';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log('Connected to MongoDB');

        // Crear usuarios predeterminados
        const userRepository = new MongoUserRepository();
        const createUserCase = new CreateUserCase(userRepository);

        const adminUser = {
            username: "admin",
            email: "admin@example.com",
            password: "adminpassword",
            nombre: "Admin User",
            rol: 'admin' as Role, // Asegúrate de castear rol como Role
            permissions: rolePermissions.admin // Accede a los permisos por la clave correcta
        };

        const thiefUser = {
            username: "thief",
            email: "thief@example.com",
            password: "thiefpassword",
            nombre: "Thief User",
            rol: 'ladron' as Role, 
            permissions: rolePermissions.ladron 
        };

        await createUserCase.run(adminUser);
        await createUserCase.run(thiefUser);
        console.log(`Se crearon los usuarios predeterminados: ${adminUser.username} y ${thiefUser.username}`);

    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export default connectToDatabase;
