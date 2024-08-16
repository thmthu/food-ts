import { User } from "./User";
export interface Bill {
    id: number;
    email: string;
    total?: number;
    created_at: Date;
    user?: User;
}
