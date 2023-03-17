import {BlogType} from "../types";
import {blogCollections} from "../../mongoDB";

export const blogRepository = {

    async getAllBlogs(filter: any, sort: any, skip: any, limit: any): Promise<any> {
        return await blogCollections.find(filter).sort(sort).skip(skip).limit(limit).toArray()
    },

    async getBlogById(id: { id: string }): Promise<BlogType | null> {
        return blogCollections.findOne(id)
    },

    async getTotalCount(filter: any) {
        return await blogCollections.countDocuments(filter)
    },

    async createBlog(newBlog: BlogType): Promise<void> {
        await blogCollections.insertOne(newBlog)
    },

    async changeBlog(id: { id: string }, updateBLog: { $set: BlogType }): Promise<boolean> {
        const result = await blogCollections.updateOne(id, updateBLog)
        return result.matchedCount === 1;

    },

    async deleteBlog(id: { id: string }): Promise<boolean> {
        const result = await blogCollections.deleteOne(id)
        return result.deletedCount === 1
    },

    async deleteAllBlogs() {
        await blogCollections.deleteMany({})
    }
}