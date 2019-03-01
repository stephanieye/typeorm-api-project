import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

class CommentController{

static listAll = async (req: Request, res: Response) => {
  const commentRepository = getRepository(Comment);
  const comments = await commentRepository.find();
  res.send(comments);
};

static getOneById = async (req: Request, res: Response) => {
  const id: number = req.params.id;
  const commentRepository = getRepository(Comment);
  try {
    const comment = await commentRepository.findOneOrFail(id);
    res.send(comment);
  } catch (error) {
    res.status(404).send("Comment not found");
  }
};

static editComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { text } = req.body;
  const commentRepository = getRepository(Comment);
  let comment;
  try {
    comment = await commentRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Sorry, comment not found 😿");
    return;
  }
  comment.text = text;
  const errors = await validate(comment);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  try {
    await commentRepository.save(comment);
  } catch (e) {
    res.status(500).send("Sorry, something went wrong 😿");
    return;
  }
  res.status(204).send();
};

static deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const commentRepository = getRepository(Comment);
  let comment: Comment;
  try {
    comment = await commentRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Sorry, comment does not exist in the first place 😿");
    return;
  }
  commentRepository.delete(id);
  res.status(204).send();
};
};

export default CommentController;