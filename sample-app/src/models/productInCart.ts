import { IReviews } from "./product";

export interface IProductInCart {
    id: number;
    genderCategory: string[];
    catalogCategory: string[];
    title: string;
    size: string;
    price: number;
    color: string;
    sales: number;
    images: string[];
    counter: number;
    reviews: IReviews[] | [];
}