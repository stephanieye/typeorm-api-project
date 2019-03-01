import { Response, Router } from 'express'
import UserController from '../controllers/UserController'
import { checkIsUser } from '../middlewares/checkIsUser'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', UserController.listAll)

router.get('/:id', UserController.getOneById)

router.post('/', UserController.newUser)

router.patch('/:id', [checkJwt, checkIsUser], UserController.editUser)

router.delete('/:id', [checkJwt, checkIsUser], UserController.deleteUser)

export default router
