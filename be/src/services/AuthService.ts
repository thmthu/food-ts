import { Container, Service, Inject } from 'typedi'
import { IUser, IUserInputDTO } from '../interface/User'
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { key, refreshKey } from '../config/jwt'
import { TokenService } from './TokenService';

@Service()
class AuthService {
    constructor(
        @Inject('UserRepository') private UserRepository: Repository<IUser>
    ) { }
    public generateToken(user, key: string, days: number = 30) {
        const today = new Date();
        const exp = new Date(today);
        exp.setSeconds(today.getSeconds() + (30 * 24 * 60 * 60));

        return jwt.sign(
            {
                _id: user._id,
                name: user.name,
                exp: Math.floor(exp.getTime() / 1000),
            },
            key
        );
    }
    public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

        const userRecord = this.UserRepository.create({
            ...userInputDTO,
            salt: salt.toString('hex'),
            password: hashedPassword,
        });
        const user = await this.UserRepository.save(userRecord);
        // const token = this.generateToken(userRecord, key);
        // const refreshToken = this.generateToken(userRecord, refreshKey, 30)
        if (!userRecord) {
            throw new Error('User cannot be created');
        }
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        return { user };
    } catch(e) {
        console.log(e);
        throw e;
    }

    public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string, refreshToken: string }> {
        const userRecord = await this.UserRepository.findOneBy({ email: email });
        if (!userRecord) {
            throw new Error('User not registered');
        }
        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
            const token = this.generateToken(userRecord, key);
            const refreshToken = this.generateToken(userRecord, refreshKey, 30)
            const id: Number = parseInt(userRecord._id)
            await Container.get(TokenService).insertTokenById(id, refreshToken)
            const user: IUser = {
                _id: userRecord._id,
                name: userRecord.name,
                email: userRecord.email,
                password: userRecord.password,
                salt: userRecord.salt,
            };


            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');

            return { user, token, refreshToken };
        } else {
            throw new Error('Invalid Password');
        }
    }


}

export { AuthService }
