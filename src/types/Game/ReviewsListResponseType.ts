import ReviewType from "./ReviewType"

interface ReviewsListResponseType {
    count : number
    next? : string
    previous? : string
    results : ReviewType[]
}

export default ReviewsListResponseType