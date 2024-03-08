import ArticleType from "./ArticleType"

interface ArticleListResponseType {
    count: number
    next?: string
    previous?: string
    results: ArticleType[]
}

export default ArticleListResponseType