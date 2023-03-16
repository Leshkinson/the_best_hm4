import {PostType} from "../types";


export const postModels = (posts: any): any => {
    const postConverter = (post:PostType) => {
        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    }

    if (Array.isArray(posts.items)){
        return {...posts, items: posts.items.map((ps: PostType) => postConverter(ps))}
    }
    return postConverter(posts)
}