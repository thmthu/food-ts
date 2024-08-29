import { Inject, Service } from "typedi";
import { Token } from "../interface";
import { Repository, DataSource } from "typeorm";
@Service()
class TokenService {
    constructor(@Inject(() => DataSource) private dataSource: DataSource,
        @Inject("TokenRepository") private repository: Repository<Token>) { }
    public async getRefreshTokenById(id: Number) {
        try {
            const token = await this.repository.findOne({
                where: { idUser: id },
            });
            return token.refreshToken;
        } catch (error) {
            console.error(`Error fetching token with ID ${id}:`, error);
            throw new Error('Error fetching token');
        }
    }
    public async insertTokenById(userID: Number, refreshToken: string): Promise<Token> {
        try {
            const today = new Date();
            const expireAt = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds

            const token = this.repository.create({
                refreshToken,
                expireAt: expireAt,
                createAt: new Date(),
                invokeAt: new Date(),
                idUser: userID
            });

            // Save the token to the database
            await this.repository.save(token);
            return token;
        } catch (error) {
            console.error(`Error inserting token for ID ${userID}:`, error);
            throw new Error('Error inserting token');
        }
    }
}
export { TokenService }