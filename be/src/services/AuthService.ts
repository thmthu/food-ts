import { Container, Service, Inject } from 'typedi'
import { IUser, IUserInputDTO } from '../interface/User'
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { key } from '../config/jwt'

@Service()
export default class AuthService {
    constructor(
        @Inject('UserRepository') private UserRepository: Repository<IUser>
    ) { }
    private generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign(
            {
                _id: user._id,
                name: user.name,
                exp: exp.getTime() / 1000,
            },
            key
        );
    }

    public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

        const userRecord = this.UserRepository.create({
            ...userInputDTO,
            salt: salt.toString('hex'),
            password: hashedPassword,
        });
        const user = await this.UserRepository.save(userRecord);
        const token = this.generateToken(userRecord);

        if (!userRecord) {
            throw new Error('User cannot be created');
        }
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        return { user, token };
    } catch(e) {
        console.log(e);
        throw e;
    }

    public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const userRecord = await this.UserRepository.findOneBy({ email: email });
        if (!userRecord) {
            throw new Error('User not registered');
        }
        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
            const token = await this.generateToken(userRecord);
            const user: IUser = {
                _id: userRecord._id,
                name: userRecord.name,
                email: userRecord.email,
                password: userRecord.password,
                salt: userRecord.salt,
            };


            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');

            return { user, token };
        } else {
            throw new Error('Invalid Password');
        }
    }


}


