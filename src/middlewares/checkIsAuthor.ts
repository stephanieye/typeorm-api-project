import { Request, Response, NextFunction } from "express";
import Post from '../entity/Post';
import {getRepository} from "typeorm";

export const checkIsAuthor = (req: Request, res: Response, next: NextFunction) => {
  const currentUserId = res.locals.jwtPayload.userId;
  getRepository(Post).findOne(req.params.id)
  .then(post => {
    const authorId = post.user.id
    if (authorId == currentUserId) next();  
    else res.status(404).send("Sorry, you are not authorised to modify this post 😿");
  })
};