import {blogsControl} from "../repositories/repository-blogs";
import {Request, Response} from "express";

export const serviceBlog = {
   async getBlogs(req: Request, res: Response){
       const filter: any = {}
        const search = req.query?.name?.toString()
       if(search){
           filter.name = {$regex: search}
       }
       return await blogsControl.getAllBlogs(filter)
    }
}