import { config } from 'dotenv';
config();

type Algorithm = 'HS256' | 'RS256' | 'ES256';

const key: string = process.env.JWT_KEY || 'default_secret_key';
const refreshKey: string = process.env.JWT_REFRESHKEY || 'default_secret_key';


const allowedAlgorithms: Algorithm[] = ['HS256', 'RS256', 'ES256'];
const rawAlgorithm: string | undefined = process.env.JWT_ALGORITHM;
const isValidAlgorithm = (value: string): value is Algorithm => {
    return allowedAlgorithms.includes(value as Algorithm);
};

const algorithms: Algorithm = isValidAlgorithm(rawAlgorithm || '') ? rawAlgorithm as Algorithm : 'HS256';

export { key, algorithms, refreshKey };
