import {serviceBlog} from "../services/service-blog";
import {Request, Response} from "express";
import {DefaultValueListType} from "../types";
import {HTTP_STATUSES} from "../http_statuses";
import {blogsModels} from "../models/blogs-models";

const DEFAULT_VALUE_LIST: DefaultValueListType = {
    FIELD_FOR_SORT: "createdAt",
    SORT_DIRECTION: "desc",
    PAGE_NUMBER: 1,
    PAGE_SIZE: 7
}

export const controllerBlog = {
    async getAllBlogs(req: Request, res: Response) {
        const query =  {
            pageNumber : Number(req.query.pageNumber || DEFAULT_VALUE_LIST.PAGE_NUMBER),
            pageSize : Number(req.query.pageSize ||  DEFAULT_VALUE_LIST.PAGE_SIZE),
            sortBy : req.query.sortBy as string  ||  DEFAULT_VALUE_LIST.FIELD_FOR_SORT,
            searchNameTerm : req.query.searchNameTerm  as string  ||  "",
            sortDirection : req.query.sortDirection as string ||  DEFAULT_VALUE_LIST.SORT_DIRECTION
        }
        const blogs =  await serviceBlog.getBlogs(query)
        res.status(HTTP_STATUSES.OK200).send(blogsModels(blogs))
    }
}