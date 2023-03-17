import {Request, Response, Router} from "express";
import {repositoryPost} from "../repositories/repository-posts";
import {HTTP_STATUSES} from "../http_statuses";
import {blogRepository} from "../repositories/repository-blogs";

export const testingRouter = Router({})

    testingRouter.delete('/all-data', (req: Request, res: Response) => {
        blogRepository.deleteAllBlogs()
        repositoryPost.deleteAllPosts()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    })