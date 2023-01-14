export interface IReviews {
    email: string
    descr: string
}

export interface IProduct {
    id: number;
    genderCategory: string[];
    catalogCategory: string[];
    title: string;
    size: string[];
    price: number;
    color: string[];
    sales: number;
    images: string[];
    reviews: IReviews[] | []
    counter: number
}

