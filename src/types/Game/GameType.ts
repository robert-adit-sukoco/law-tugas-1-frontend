import GenreType from "./GenreType"

interface GameType {
    slug : string
    title : string
    description : string
    genre : GenreType[]
    price : number
    avg_rating? : number
    header_image_src : string
}

export default GameType