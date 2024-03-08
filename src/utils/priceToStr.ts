export default function priceToStr(price : number) : string {
    return (price > 0) ? `$${price}` : "Free"
}