import {Request, Response} from "express";
import {servicePost} from "../services/service-post";
import {HTTP_STATUSES} from "../http_statuses";
import {postModels} from "../models/post-models";
import {DefaultValueListType} from "../types";

const DEFAULT_VALUE_LIST: DefaultValueListType = {
    FIELD_FOR_SORT: "createdAt",
    SORT_DIRECTION: "desc",
    PAGE_NUMBER: 1,
    PAGE_SIZE: 10
}

export const controllerPost = {
   async getAllPost(req: Request, res: Response){
       const query =  {
           pageNumber : Number(req.query.pageNumber || DEFAULT_VALUE_LIST.PAGE_NUMBER),
           pageSize : Number(req.query.pageSize ||  DEFAULT_VALUE_LIST.PAGE_SIZE),
           sortBy : req.query.sortBy as string  ||  DEFAULT_VALUE_LIST.FIELD_FOR_SORT,
           searchNameTerm : req.query.searchNameTerm  as string  ||  "",
           sortDirection : req.query.sortDirection as string ||  DEFAULT_VALUE_LIST.SORT_DIRECTION
       }

       const posts = await servicePost.getAllPosts(query)
       res.status(HTTP_STATUSES.OK200).send(postModels(posts))
    },
    async getPostById(req: Request, res: Response){
        const findPost = await servicePost.getPostById(req.params.id)
        if (findPost) {
            res.status(HTTP_STATUSES.OK200).send(postModels(findPost))
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND)
        }
    },
    async createPost(req: Request, res: Response){
        const newPost = await servicePost.createPost(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(postModels(newPost))
    },
    async  changePost(req: Request, res: Response){
        const isChangePost = await servicePost.changePost(req.params.id, req.body)
        if (isChangePost) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT)
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND)
        }
    },
    async deletePost(req: Request, res: Response){
        const isDeleted = await servicePost.deletePost(req.params.id)
        if (isDeleted) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT)
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND)
        }
    }
}