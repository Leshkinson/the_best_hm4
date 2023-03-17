import {blogRepository} from "../repositories/repository-blogs";
import {BlogType, InitBlogType, QueryForBlogsType} from "../types";
import {getSortSkipLimit} from "../utils/getSortSkipLimit";
import {repositoryPost} from "../repositories/repository-posts";

export const blogService = {
    async getBlogs(query: QueryForBlogsType) {
        const {pageNumber, pageSize, searchNameTerm} = query
        const filter: any = {}
        const search = searchNameTerm?.toString()
        if (search) {
            filter.name = {$regex: new RegExp(`${search}`, 'i')}
        }
        const totalCount = await blogRepository.getTotalCount(filter)
        const [sort, skip, limit] = await getSortSkipLimit(query)
        return {
            pagesCount: Math.ceil(totalCount / +pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: await blogRepository.getAllBlogs(filter, sort, skip, +limit)
        }
    },

    async getBlogById(id: string) {
        const filter = {id: id}
        return await blogRepository.getBlogById(filter)
    },

    async getAllBlogPosts(id: string, query: QueryForBlogsType) {
        const {pageNumber, pageSize} = query
        const [sort, skip, limit] = await getSortSkipLimit(query)
        const filter: any = {blogId : id}
        const totalCount = await repositoryPost.getTotalCount(filter)
        return {
            pagesCount: Math.ceil(totalCount / +pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: await repositoryPost.getAllBlogPosts(filter, sort, skip, +limit)
        }
    },

    async createBlog(blog: BlogType) {
        const newBlog = {
            id: (+(new Date())).toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogRepository.createBlog(newBlog)
        return newBlog
    },

    async createPostInBlog(id: string, post : InitBlogType){
        const findBlog = await blogService.getBlogById(id)
        const newPost = {
            id: (+(new Date())).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: id,
            //@ts-ignore
            blogName: findBlog.name,
            createdAt: new Date().toISOString()
        }
        console.log('req.body',newPost)
        await repositoryPost.createPost(newPost)
        return newPost
    },

    async changeBlog(id: string, blog: BlogType): Promise<boolean> {
        const {name, description, websiteUrl} = blog
        const updateBLog = {$set: {name, description, websiteUrl}} as { $set: BlogType }
        const filter = {id: id}
        return await blogRepository.changeBlog(filter, updateBLog)
    },

    async deleteBlog(id: string): Promise<boolean> {
        const filter = {id: id}
        return await blogRepository.deleteBlog(filter)
    }
}

