import { Request, Response, NextFunction } from 'express';
import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
import { BillSchema, UserSchema, BillDetailSchema } from '../entity';
import AuthService from '../services/AuthService';
import { IUser, IUserInputDTO } from '../interface/User';
import { Service } from 'typedi';
@Service()
class UserController {
    constructor(private service: AuthService) { }
    public async SignUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { user, token } = await this.service.SignUp(req.body as IUserInputDTO);
            return res.json({ user, token }).status(200);
        } catch (e) {
            return next(e);
        }
    }
    public async SignIn(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const { user, token } = await this.service.SignIn(email, password);
            return res.json({ user, token }).status(200);
        } catch (e) {
            return next(e);
        }



    }
}


const bill = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { billDetails, email, total } = req.body;
        const dataSource = await AppDataSourceSingleton.getInstance();
        const bill = dataSource.getRepository(BillSchema);
        const newBill = await bill.create({
            email,
            total
        });
        await bill.save(newBill);
        const billId = newBill.id;
        for (let detail of billDetails) {
            dataSource.getRepository(BillDetailSchema).create({
                bill_id: billId,
                dish_id: detail.dish_id,
                quantity: detail.quantity
            });
            await dataSource.getRepository(BillDetailSchema).save(newBill);
        }

        return res.status(201).json({ message: 'Bill created' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};
export { bill, UserController }

