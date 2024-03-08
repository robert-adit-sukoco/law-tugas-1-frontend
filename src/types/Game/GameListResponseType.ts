import GameType from "./GameType"

interface GameListResponseType {
    count : number
    next? : string
    previous? : string
    results : GameType[]
}

export default GameListResponseType