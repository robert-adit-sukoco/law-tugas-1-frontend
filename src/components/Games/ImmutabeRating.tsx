import { Rating } from "react-simple-star-rating"

export default function ImmutableRating({
    rating
} : { rating : number }) {
    return (
        <Rating SVGclassName={"inline-block"} readonly initialValue={rating} />
    )
}
