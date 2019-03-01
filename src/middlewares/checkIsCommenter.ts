import { Request, Response, NextFunction } from "express";
import Comment from '../entity/Comment';
import {getRepository} from "typeorm";

export const checkIsCommenter = (req: Request, res: Response, next: NextFunction) => {
  const currentUserId = res.locals.jwtPayload.userId;
  getRepository(Comment).findOne(req.params.id)
  .then(comment => {
    const commenterId = comment.user.id
    if (commenterId == currentUserId) next();  
    else res.status(404).send("Sorry, you are not authorised to modify this comment 😿");
  })
};