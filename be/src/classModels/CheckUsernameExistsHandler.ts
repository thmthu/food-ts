import UserHandler from './UserHandler';
import { Repository } from 'typeorm';
import { User } from '../entityModels/User';
import { Response } from 'express';

class CheckUsernameExistsHandler extends UserHandler {
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        super();
        this.userRepository = userRepository;
    }

    public async handle(request: any): Promise<Response | null> {
        const { user } = request.body;
        const existingUser = await this.userRepository.findOneBy({ username: user });
        if (existingUser) {
            return request.res.status(400).json({ message: 'Username already exists' });
        }
        return super.handle(request);
    }
}

export { CheckUsernameExistsHandler };