import { IUser } from './User';

export interface Token {
    _id: Number;
    refreshToken: string;
    expireAt: Date;
    createAt: Date;
    invokeAt: Date;
    idUser?: Number;
    user?: IUser;

}
