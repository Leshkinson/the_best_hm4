import {BlogType} from "../types";


export const blogsModels = (blogs: any): any => {
    const blogConverter = (blog: BlogType) => {
        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }

    if (Array.isArray(blogs.items)) {
        return {...blogs, items: blogs.items.map((bl: BlogType) => blogConverter(bl))}
    }
    return blogConverter(blogs)
}