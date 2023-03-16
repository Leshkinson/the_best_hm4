import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../http_statuses";
import {checkPostId, postValidations} from "../validator/validators";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {authorizationGuard} from "../middleware/authorization-guard";
import {postModels} from "../models/post-models";
import {servicePost} from "../services/service-post";



export const postsRouter = Router({})

//-------------------GET---------------//
postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await servicePost.getAllPosts()
    res.status(HTTP_STATUSES.OK200).send(postModels(posts))
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const findPost = await servicePost.getPostById(req.params.id)
    if (findPost) {
        res.status(HTTP_STATUSES.OK200).send(postModels(findPost))
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})
//-------------------POST---------------//
postsRouter.post('/', authorizationGuard, postValidations, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newPost = await servicePost.createPost(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(postModels(newPost))
})
//-------------------PUT---------------//
postsRouter.put('/:id', authorizationGuard,checkPostId, postValidations, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isChangePost = await servicePost.changePost(req.params.id, req.body)
    if (isChangePost) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})
//-------------------DELETE---------------//
postsRouter.delete('/:id', authorizationGuard, async (req: Request, res: Response) => {
    const isDeleted = await servicePost.deletePost(req.params.id)
    if (isDeleted) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})
