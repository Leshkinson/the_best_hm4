import {BlogType} from "../types";
import {blogCollections} from "../../mongoDB";

export const blogsControl = {
    async getAllBlogs(filter: any): Promise<any> {
        return {
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            items: await blogCollections.find(filter).toArray()
        }
    },
    async getBlogById(id: string): Promise<BlogType | null> {
        return blogCollections.findOne({id: id})
    },
    async createBlog(body: BlogType): Promise<BlogType> {
        const newBlog = {
            id: (+(new Date())).toString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogCollections.insertOne(newBlog)
        return newBlog
    },
    async changeBlog(id: string, body: BlogType): Promise<boolean> {
        const {name, description, websiteUrl} = body
        const result = await blogCollections.updateOne({id: id}, {$set: {name, description, websiteUrl}})
        return result.matchedCount === 1;

    },
    async deleteBlog(id: string) {
        const result = await blogCollections.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllBlogs() {
        await blogCollections.deleteMany({})
    }
}