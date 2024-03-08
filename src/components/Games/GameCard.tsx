import { Card, CardBody, Heading, Stack, Text, Divider, CardFooter, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function GameCard({
    slug,
    title,
    description,
    price,
    average_star,
    imageSrc
} : {slug : string, title : string, description : string, price : number, average_star? : number, imageSrc : string}) {

    const router = useRouter()
    const priceString = (price > 0) ? `$${price}` : "Free" 
    
    return (
        <Card maxW='sm' m={3}>
            <CardBody>
                <Image
                    src={imageSrc}
                    alt='Green double couch with wooden legs'
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{title}</Heading>
                <Text>
                    {description}
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                    {priceString} | Rating: {average_star ?? `0/5`}
                </Text>
                </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button variant='solid' colorScheme='blue' onClick={() => router.push(`/games/${slug}`)}>
                        Details
                    </Button>
                </CardFooter>
                </Card>
    )
}