export type BlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    isMembership: boolean
    createdAt: string
}

export type PostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type QueryForBlogsType = {
    pageNumber : number
    pageSize: number
    sortBy: string
    sortDirection: string
    searchNameTerm: string
}

export type DefaultValueListType = {
    FIELD_FOR_SORT : string
    SORT_DIRECTION : string
    PAGE_NUMBER : number
    PAGE_SIZE : number
}

export type InitBlogType = {
    title: string,
    shortDescription: string,
    content: string
}