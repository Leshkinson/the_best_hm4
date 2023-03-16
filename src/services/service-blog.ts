import {repositoryBlog} from "../repositories/repository-blogs";
import {BlogType, DefaultValueListType, QueryForBlogsType} from "../types";
import {getSortSkipLimit} from "../utils/getSortSkipLimit";

export const serviceBlog = {
    async getBlogs(query: QueryForBlogsType) {
  const  {pageNumber, pageSize, searchNameTerm}  = query
        const filter: any = {}
        const search = searchNameTerm?.toString()
        if (search) {
            filter.name = {$regex: new RegExp(`${search}`, 'i')}
        }
        const totalCount = await repositoryBlog.getTotalCount(filter)
        const [sort, limit, skip] = await getSortSkipLimit(query)
        return {
            pagesCount: Math.ceil(totalCount / +pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: await repositoryBlog.getAllBlogs(filter, sort, skip, +limit)
        }
    },
    async getBlogById(id: string) {
        const filter = {id: id}
        return await repositoryBlog.getBlogById(filter)
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
        await repositoryBlog.createBlog(newBlog)
        return newBlog
    },
    async changeBlog(id: string, blog: BlogType): Promise<boolean> {
        const {name, description, websiteUrl} = blog
        const updateBLog = {$set: {name, description, websiteUrl}} as { $set: BlogType }
        const filter = {id: id}
        return await repositoryBlog.changeBlog(filter, updateBLog)
    },
    async deleteBlog(id: string): Promise<boolean> {
        const filter = {id: id}
        return await repositoryBlog.deleteBlog(filter)
    }
}

