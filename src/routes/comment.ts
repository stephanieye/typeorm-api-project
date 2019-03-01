import { Router } from 'express'
import CommentController from '../controllers/CommentController'
import { checkIsCommenter } from '../middlewares/checkIsCommenter'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', CommentController.listAll)

router.get('/:id', CommentController.getOneById)

router.patch('/:id', [checkJwt, checkIsCommenter], CommentController.editComment)

router.delete('/:id', [checkJwt, checkIsCommenter], CommentController.deleteComment)

export default router
