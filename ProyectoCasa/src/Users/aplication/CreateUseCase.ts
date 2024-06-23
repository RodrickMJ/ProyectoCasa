import { UserCreateRequest } from "../domain/DTOS/UserRequest";
import UserRepository from "../domain/UserRepository";

export default class CreateUserCase {
    constructor (readonly entryRepository: UserRepository) {}

    async run (user: UserCreateRequest) {
        const userAdded = await this.entryRepository.create(user);

        if (!userAdded) {
            return null;
        }

        return userAdded;
    }
}
