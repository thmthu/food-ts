import { config } from 'dotenv';
config();
const key = process.env.JWT_KEY
export { key }