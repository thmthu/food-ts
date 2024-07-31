import { Restaurant } from './Restaurant'; // Adjust the import path as necessary

export interface Featured {
    id: number;
    name: string;
    description: string;
    restaurants?: Restaurant[]; // Add the restaurants property
}