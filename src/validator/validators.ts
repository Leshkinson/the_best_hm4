import {body} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../http_statuses";
import {blogService} from "../services/blog-service";
import {servicePost} from "../services/service-post";

const urlPattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');

const titleValidation = body('title')
    .isString().withMessage('Invalid type')
    .trim()
    .isLength({min: 1, max: 30}).withMessage('Not correct length')
    .notEmpty().withMessage('Field must not be empty')

const shortDescriptionValidation = body('shortDescription')
    .isString().withMessage('Invalid type')
    .trim().isLength({min: 1, max: 100}).withMessage('Not correct length')
    .notEmpty().withMessage('Field must not be empty')

const contentValidation = body('content')
    .isString().withMessage('Invalid type')
    .trim()
    .isLength({min: 1, max: 1000}).withMessage('Not correct length')
    .notEmpty().withMessage('Field must not be empty')

const blogIdValidation = body('blogId')
    .isString().withMessage('Invalid type')
    .trim()
    .notEmpty().withMessage('Field must not be empty')
    .custom(async value => {
     const isHaveBlog = await blogService.getBlogById(value)
       if(!isHaveBlog) {
            throw new Error();
       }
        return false
    }).withMessage('No blog!')

export const checkBlogId = async (req: Request, res: Response, next: NextFunction) =>{
    const isHaveBlog = await blogService.getBlogById(req.params.id)
    if(!isHaveBlog){
       res.sendStatus(HTTP_STATUSES.NOT_FOUND)
        return
    }
    next()
}


export const checkPostId = async (req: Request, res: Response, next: NextFunction) =>{
    const isHaveId = await servicePost.getPostById(req.params.id)
    isHaveId ? next() :  res.sendStatus(HTTP_STATUSES.NOT_FOUND)
}

const nameValidation = body('name')
    .isString().withMessage('Invalid type')
    .trim()
    .isLength({min: 1, max: 15}).withMessage('Not correct length')
    .notEmpty().withMessage('Field must not be empty')

const descriptionValidation = body('description')
    .isString().withMessage('Invalid type')
    .trim()
    .isLength({min: 1, max: 500}).withMessage('Not correct length')
    .notEmpty().withMessage('Field must not be empty')

const websiteUrlValidation = body('websiteUrl')
    .isString().withMessage('Invalid type')
    .trim()
    .isLength({min: 1, max: 100}).withMessage('Not correct length')
    .custom(value => urlPattern.test(value)).withMessage('Is not URL!')
    .notEmpty().withMessage('Field must not be empty')

export const postValidations = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation]
export const blogValidations = [nameValidation, descriptionValidation, websiteUrlValidation]
export const createPostByBlogValidations = [titleValidation, shortDescriptionValidation, contentValidation]