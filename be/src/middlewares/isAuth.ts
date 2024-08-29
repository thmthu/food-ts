import { expressjwt } from 'express-jwt';
import { key, algorithms } from '../config/jwt';

const getTokenFromHeader = (req: any): string | null => {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const isAuth = expressjwt({
    secret: key,
    algorithms: [algorithms],
    requestProperty: 'token',
    getToken: getTokenFromHeader,
});

export { isAuth };
