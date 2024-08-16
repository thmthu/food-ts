import { Featured } from "./Featured";
export interface IFeature {
    getAll(): Promise<Featured[]>;

}