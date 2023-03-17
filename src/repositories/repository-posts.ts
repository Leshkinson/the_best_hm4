import {PostType} from "../types";
import {postCollections} from "../../mongoDB";

export const repositoryPost = {

    async getAllPosts(filter:any, sort: any, skip: any, limit: number): Promise<PostType[]> {
        return postCollections.find(filter).sort(sort).skip(skip).limit(limit).toArray()
    },

    getPostById(id: {id :string }): Promise<PostType | null> {
        return postCollections.findOne(id)
    },

    async getTotalCount(filter:any){
        return await postCollections.countDocuments(filter)
    },

    async getAllBlogPosts(filter: any,sort: any, skip: any, limit: number){
       return await postCollections.find(filter).sort(sort).skip(skip).limit(limit).toArray()
    },

    async createPost(newPost: PostType): Promise<void > {
            await postCollections.insertOne(newPost)
    },

    async changePost(id: {id: string }, update: {$set : PostType}): Promise<boolean> {
        const result = await postCollections.updateOne(id, update)
        return (result.matchedCount === 1);

    },

    async deletePost(id: string):Promise<boolean> {
        const result = await postCollections.deleteOne({id: id})
        return result.deletedCount === 1

    },

    async deleteAllPosts() {
        await postCollections.deleteMany({})
    }
}