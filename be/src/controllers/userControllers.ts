import { Request, Response } from 'express';
import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
import { BillSchema, UserSchema, BillDetailSchema } from '../entity';

const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const dataSource = await AppDataSourceSingleton.getInstance();
        const userRepository = dataSource.getRepository(UserSchema);
        const user = await userRepository.findOneBy({ email, password });
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password, user, address } = req.body;
        const dataSource = await AppDataSourceSingleton.getInstance();
        const userRepository = dataSource.getRepository(UserSchema);
        const checkUser = await userRepository.findOneBy({ email, username: user });
        if (checkUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }
        const newUser = await userRepository.create({
            email,
            password,
            username: user,
            address
        });
        await userRepository.save(newUser);

        // const [existingUsers] = await connection.query(
        //     'SELECT * FROM Users WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)',
        //     [email, user]
        // );

        // if (existingUsers.length > 0) {
        //     return res.status(400).json({ message: 'Email or username already exists' });
        // }

        // await connection.query(
        //     'INSERT INTO Users (email, password, username, address) VALUES (?,?,?,?)',
        //     [email, password, user, address]
        // );

        return res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

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
        // Insert into Bills table
        // const [bill] = await connection.query(
        //     'INSERT INTO Bills (email, total) VALUES (?,?)',
        //     [email, total]
        // );

        // // Get the id of the inserted bill
        // const billId = bill.insertId;

        // // Insert into BillDetails table
        // for (let detail of billDetails) {
        //     await connection.query(
        //         'INSERT INTO BillDetails (bill_id, dish_id, quantity) VALUES (?,?,?)',
        //         [billId, detail.dish_id, detail.quantity]
        //     );
        // }

        return res.status(201).json({ message: 'Bill created' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

export { login, signup, bill };