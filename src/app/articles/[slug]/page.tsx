'use client'

import ArticleType from "@/types/Article/ArticleType";
import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticleDetail() {

    const {slug} = useParams()
    const [content, setContent] = useState<ArticleType | undefined>()

    useEffect(() => {
        async function fetchArticle() {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${slug}`
            const response = await fetch(url)
            const data : ArticleType = await response.json() satisfies ArticleType
            setContent(data)
        }
        fetchArticle()
    }, [])

    return (
        <>
            <Heading>
                {content?.title}
            </Heading>

            <Text fontSize={"xl"}>
                {`Author: ${content?.author} | Published: ${content?.published_at}`}
            </Text>

            <Text>
                {content?.content}
            </Text>
            
        </>
    )
}