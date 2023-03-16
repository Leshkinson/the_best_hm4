import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../http_statuses";
import {blogValidations} from "../validator/validators";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {authorizationGuard} from "../middleware/authorization-guard";
import {blogsModels} from "../models/blogs-models";
import {serviceBlog} from "../services/service-blog";
import {controllerBlog} from "../controllers/controller-blog";

export const blogsRouter = Router({})

//-------------------GET---------------//
blogsRouter.get('/', controllerBlog.getAllBlogs)
blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const findBlog = await serviceBlog.getBlogById(req.params.id)
    if (findBlog) {
        res.status(HTTP_STATUSES.OK200).send(blogsModels(findBlog))
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})
//-------------------POST---------------//
blogsRouter.post('/', authorizationGuard, blogValidations, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newBlog = await serviceBlog.createBlog(req.body)
    res.status(HTTP_STATUSES.CREATED_201).send(blogsModels(newBlog))
})
//-------------------PUT---------------//
blogsRouter.put('/:id', authorizationGuard, blogValidations, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isChangeBlog = await serviceBlog.changeBlog(req.params.id, req.body)
    if (isChangeBlog) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
        return
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND)
})
//-------------------DELETE---------------//
blogsRouter.delete('/:id', authorizationGuard, async (req: Request, res: Response) => {
    const isDeleted = await serviceBlog.deleteBlog(req.params.id)
    if (isDeleted) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})