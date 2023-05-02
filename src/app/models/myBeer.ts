import { Beer } from "./beer";

export interface MyBeer {
    beer?: Beer;
    userId: string;
    quantity: number;
    rating: number;
}