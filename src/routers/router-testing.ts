import {Request, Response, Router} from "express";
import {repositoryPost} from "../repositories/repository-posts";
import {HTTP_STATUSES} from "../http_statuses";
import {repositoryBlog} from "../repositories/repository-blogs";

export const testingRouter = Router({})

    testingRouter.delete('/all-data', (req: Request, res: Response) => {
        repositoryBlog.deleteAllBlogs()
        repositoryPost.deleteAllPosts()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    })