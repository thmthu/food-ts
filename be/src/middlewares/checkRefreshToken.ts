import Container from "typedi";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { key, refreshKey } from '../config/jwt';
import { JwtPayload } from "../interface";
import { TokenService, AuthService } from "../services";
function verifyToken(token: string): JwtPayload {
    try {
        const decoded = jwt.verify(token, refreshKey);
        if (typeof decoded === 'object' && decoded !== null) {
            return decoded as JwtPayload;
        }
        throw new Error('Decoded token is not an object or is null');
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.error('JWT error:', error.message);
        } else {
            console.error('Error verifying token:', error.message);
        }
        throw new Error('Invalid or expired refresh token');
    }
}

async function checkRefreshToken(req: Request, res: Response) {
    const myAuthService = Container.get(AuthService);
    const myTokenService = Container.get(TokenService);

    const userRefreshToken: string = req.body.refreshToken;

    if (!userRefreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded: JwtPayload | null = verifyToken(userRefreshToken);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        const userID = decoded._id;
        const serverRefreshToken = await myTokenService.getRefreshTokenById(parseInt(userID));

        if (serverRefreshToken && serverRefreshToken === userRefreshToken) {
            const newAccessToken = myAuthService.generateToken({ _id: userID, name: decoded.name }, key);
            const newRefreshToken = myAuthService.generateToken({ _id: userID, name: decoded.name }, refreshKey, 30);
            return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        } else {
            return res.status(401).json({ message: 'Refresh token does not match' });
        }

    } catch (error) {
        console.error('Error handling refresh token request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export { checkRefreshToken }