import { Response } from 'express';

abstract class UserHandler {
    protected nextHandler: UserHandler | null = null;

    public setNext(handler: UserHandler): UserHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async handle(request: any): Promise<Response | null> {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}
export default UserHandler;