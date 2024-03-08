'use client'

import GameType from "@/types/Game/GameType"
import { useParams } from "next/navigation"
import { SetStateAction, useEffect, useState } from "react"
import { Text, Heading, Image, Flex, Badge, Link, SimpleGrid, Card, CardBody, CardHeader, Skeleton, Button, Input, Select } from "@chakra-ui/react"
import priceToStr from "@/utils/priceToStr"
import ReviewsListResponseType from "@/types/Game/ReviewsListResponseType"
import ReviewType from "@/types/Game/ReviewType"
import ImmutableRating from "@/components/Games/ImmutabeRating"
import { useCookies } from "next-client-cookies"

export default function GameDetail() {

    const { slug } = useParams()
    const [gameDetails, setGameDetails] = useState<GameType>()
    const [gameReviews, setGameReviews] = useState<ReviewType[]>()
    const [reviewTextValue, setReviewTextValue] = useState<string>("")
    const [reviewRating, setReviewRating] = useState<number>(5)
    const cookies = useCookies()


    useEffect(() => {
        async function fetchGameDetails() {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${slug}`
            const response = await fetch(url)
            const data : GameType = await response.json() satisfies GameType
            setGameDetails(data)
        }
        async function fetchGameReviews() {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${slug}/reviews`
            const response = await fetch(url)
            const data : ReviewsListResponseType = await response.json() satisfies ReviewsListResponseType
            setGameReviews(data.results)   
        }
        fetchGameDetails()
        fetchGameReviews()
    }, [])

    function handleReviewTextChange(event: { target: { value: SetStateAction<string> } }) {
        setReviewTextValue(event.target.value)
    }

    async function submitReview() {
        const token = cookies.get('access_token')
        if (token) {
            const submitBody = {
                star: reviewRating,
                description: reviewTextValue
            }
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${slug}/reviews`
            const response = await fetch(url, {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify(submitBody)
            })
            if (!(response.ok)) {
                console.error("An error occured")
            }
        } else {
            console.error("You need to be logged in")
        }
    }

    function onPressSubmitReview() {
        submitReview()
    }

    function handleRatingChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedRating = parseInt(event.target.value, 10);
        setReviewRating(selectedRating);
    };

    return (
        <div>
            <Image maxWidth={800} src={gameDetails?.header_image_src}/>
            
            <Heading my={2}>
                {gameDetails ? gameDetails.title : <Skeleton height={"50px"} width={"500px"} />}
            </Heading>
            
            <Flex>
                {gameDetails ? 
                    gameDetails.genre.map(g => (
                        <Link key={g.id} href={`/games?genre=${g.id}`}>
                            <Badge mr={3}>{g.name}</Badge>
                        </Link>
                    ))
                    :
                    <>
                        <Skeleton height="20px" width={"50px"} mr={3}/>
                        <Skeleton height="20px" width={"50px"} mr={3}/>
                        <Skeleton height="20px" width={"50px"}/>
                    </>
                }
            </Flex>
            
            <Text mt={5}>
                Rating: {gameDetails?.avg_rating ?? "Loading..."}
            </Text>

            <Text fontSize={'xl'} my={8}>
                {gameDetails?.description}
            </Text>
            <Text color={'green'} fontSize={'2xl'}>
                Price: {gameDetails && priceToStr(gameDetails.price)}
            </Text>

            <Heading mt={12} mb={3}>
                Leave a Review
            </Heading>
            <Input
                isInvalid={!(reviewTextValue.length <= 200)}
                value={reviewTextValue}
                onChange={handleReviewTextChange}
                errorBorderColor='red.300'
                placeholder='This game is great!'
                maxWidth={"800px"}
            />
            <Text>Your rating:</Text>
            <Select value={reviewRating} onChange={handleRatingChange} placeholder='Select rating' maxWidth={"300px"}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </Select>
            <Button onClick={onPressSubmitReview}>
                Post review
            </Button>


            <Heading mt={12} mb={3}>
                Reviews
            </Heading>

            <SimpleGrid columns={[4, null, 6]} spacing={'20px'}>
                {gameReviews?.map(review => (
                    <Card key={review.id}>
                        <CardHeader mb={3}>
                            <Text as="b">
                                {review.username}
                            </Text>
                        </CardHeader>
                        <div className="w-full pl-3">
                            <ImmutableRating rating={review.star}/>
                        </div>
                        <CardBody>
                            {review.description}
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}