'use client'

import GameCard from "@/components/Games/GameCard"
import { useEffect, useState } from "react"
import { Flex, SimpleGrid } from "@chakra-ui/react"
import GameType from "@/types/Game/GameType"
import GameListResponseType from "@/types/Game/GameListResponseType"

export default function GamesPage() {

    const [games, setGames] = useState<GameType[]>([])

    useEffect(() => {
        async function fetchGames() {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/`
            console.log(`URL: ${url}`)
            const response = await fetch(url)
            const data : GameListResponseType = await response.json() satisfies GameListResponseType
            setGames(data.results)
        }
        fetchGames()
    }, [])


    return (
        <SimpleGrid columns={[2, null, 4]} spacing='40px'>
            {games.map(game => (
                <GameCard 
                    key={game.slug} 
                    slug={game.slug} 
                    title={game.title} 
                    description={game.description} 
                    price={game.price} 
                    average_star={game.avg_rating}
                    imageSrc={game.header_image_src}
                />
            ))}
        </SimpleGrid>
    )
}