import {repositoryPost} from "../repositories/repository-posts";
import {DefaultValueListType, PostType} from "../types";
import {serviceBlog} from "./service-blog";

const DEFAULT_VALUE_LIST: DefaultValueListType = {
    FIELD_FOR_SORT: "createdAt",
    SORT_DIRECTION: "desc",
    PAGE_NUMBER: 1,
    PAGE_SIZE: 10
}


export const servicePost = {
    async getAllPosts() {
        const filter: any = {}
        const totalCount = await repositoryPost.getTotalCount(filter)
        return {
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount,
            items: await repositoryPost.getAllPosts(filter)
        }
    },
    async getPostById(id: string): Promise<PostType | null> {
        const filter = {id: id}
        return await repositoryPost.getPostById(filter)
    },
    async createPost(post: PostType) {
        const findBlog = await serviceBlog.getBlogById(post.blogId)
        const newPost = {
            id: (+(new Date())).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            //@ts-ignore
            blogName: findBlog.name,
            createdAt: new Date().toISOString()
        }
        await repositoryPost.createPost(newPost)
        return newPost
    },
    async changePost(id:string, post: PostType) {
        const {title, blogId, content, shortDescription} = post
        const findBlog = await serviceBlog.getBlogById(post.blogId)
        const filter = {id}
        const update = {
            $set: {
                title,
                blogId,
                //@ts-ignore
                blogName: findBlog.name,
                content,
                shortDescription
            }
        } as {$set : PostType}
        return await repositoryPost.changePost(filter, update)
    },
   async deletePost(id: string):Promise<boolean>{
        return await repositoryPost.deletePost(id)
    }
}