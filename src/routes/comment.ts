import { Router } from "express";
import CommentController from "../controllers/CommentController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkIsCommenter } from "../middlewares/checkIsCommenter";

  const router = Router();
  
  router.get('/', CommentController.listAll);
  
  router.get('/:id', CommentController.getOneById
  );
  
  router.patch('/:id', [checkJwt, checkIsCommenter],
  CommentController.editComment
  );

  router.delete('/:id', [checkJwt, checkIsCommenter],
  CommentController.deleteComment
  );

  export default router;