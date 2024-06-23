import CreateUserCase from "../aplication/CreateUseCase";
import getByUseCase from "../aplication/GetByUseCase";
import MongoUserRepository from "./MongoUserRepository";
import CreateControllerUser from "./controllers/CreateControllers";
import GetByIdController from "./controllers/GetByCredencials";

const mongoUserRepository = new MongoUserRepository();

const createUserCase = new CreateUserCase(mongoUserRepository);
const getByIdUser = new getByUseCase(mongoUserRepository);

const createUserController = new CreateControllerUser(createUserCase);
const byIdUserController = new GetByIdController(getByIdUser);

export {
    createUserController,
    byIdUserController
};