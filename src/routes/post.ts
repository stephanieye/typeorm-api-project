import { Router } from "express";
import PostController from "../controllers/PostController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkIsAuthor } from "../middlewares/checkIsAuthor";

  const router = Router();
  
  router.get('/', PostController.listAll);
  
  router.get('/:id', checkJwt, PostController.getOneById
  );

  router.post("/", checkJwt, PostController.newPost);
  
  router.patch('/:id', [checkJwt, checkIsAuthor],
  PostController.editPost
  );

  router.delete('/:id', [checkJwt, checkIsAuthor],
  PostController.deletePost
  );

  export default router;