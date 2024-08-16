import { Featured } from './Featured';

export interface Restaurant {
    id: number;
    name: string;
    image: string;
    description: string;
    address?: string;
    stars?: number;
    reviews?: string;
    category?: string;
    featured_id?: number;
    featured?: Featured;
}
