export interface IReview {
    email: string
    review: string
    data: string
    reviewId: string
    id: number
}

export interface ICreateReview {
    review: {
        email: string
        review: string
        data: string
    }
    id: number
}
