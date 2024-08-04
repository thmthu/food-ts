import { Repository } from 'typeorm';
import { User } from '../entity-models/User';
import UserHandler from './UserHandler';
import { Response } from 'express';
class CheckEmailExistsHandler extends UserHandler {
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        super();
        this.userRepository = userRepository;
    }

    public async handle(request: any): Promise<Response | null> {
        const { email } = request.body;
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
            return request.res.status(400).json({ message: 'Email already exists' });
        }
        return super.handle(request);
    }
}

export default CheckEmailExistsHandler;