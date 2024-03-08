'use client'

import ArticleListResponseType from "@/types/Article/ArticleListResponseType"
import ArticleType from "@/types/Article/ArticleType"
import { ListItem, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ListArticles() {

    const [articles, setArticles] = useState<ArticleType[]>([])

    useEffect(() => {
        async function fetchArticles() {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/`
            const response = await fetch(url)
            const data : ArticleListResponseType = await response.json() satisfies ArticleListResponseType
            setArticles(data.results)
        }
        fetchArticles()
    }, [])

    return (
        <>
            <UnorderedList>
                {articles.map((article) => (
                    <ListItem key={article.slug}>
                        <Link href={`/articles/${article.slug}`}>
                            {`${article.title} | by: ${article.author}`}
                        </Link>
                    </ListItem>
                ))}
            </UnorderedList>
        </>
    )
}