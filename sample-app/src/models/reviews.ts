export interface IReview {
    email: string
    review: string
    data: string
}

export interface IReviews {
    id: number
    reviews: IReview[]
}