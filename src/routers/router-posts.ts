import {Router} from "express";
import {checkPostId, postValidations} from "../validator/validators";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {authorizationGuard} from "../middleware/authorization-guard";
import {controllerPost} from "../controllers/controller-post";



export const postsRouter = Router({})

//-------------------GET---------------//
postsRouter.get('/', controllerPost.getAllPost)
postsRouter.get('/:id', controllerPost.getPostById)
//-------------------POST---------------//
postsRouter.post('/', authorizationGuard, postValidations, inputValidationMiddleware,controllerPost.createPost)
//-------------------PUT---------------//
postsRouter.put('/:id', authorizationGuard,checkPostId, postValidations, inputValidationMiddleware, controllerPost.changePost)
//-------------------DELETE---------------//
postsRouter.delete('/:id', authorizationGuard, controllerPost.deletePost)
