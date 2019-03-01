import { Router } from 'express'
import PostController from '../controllers/PostController'
import { checkIsAuthor } from '../middlewares/checkIsAuthor'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', PostController.listAll)

router.get('/:id', PostController.getOneById)

router.post('/', checkJwt, PostController.newPost)

router.patch('/:id', [checkJwt, checkIsAuthor], PostController.editPost)

router.delete('/:id', [checkJwt, checkIsAuthor], PostController.deletePost)

router.get('/:id/comments', PostController.listAllComments)

router.post('/:id/comments', [checkJwt], PostController.newComment)

export default router
