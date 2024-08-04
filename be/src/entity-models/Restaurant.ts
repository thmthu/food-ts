// src/models/Restaurant.ts
import { Featured } from './Featured'; // Adjust the import path as necessary

export interface Restaurant {
    id: number;
    name: string;
    image: string;
    description: string;
    lng?: number;
    lat?: number;
    address?: string;
    stars?: number;
    reviews?: string;
    category?: string;
    featured_id?: number;
    featured?: Featured; // Add the featured property
}
