import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';

class CommentController {
  public static listAll = async (req: Request, res: Response) => {
    const commentRepository = getRepository(Comment);
    const comments = await commentRepository.find();
    res.send(comments);
  };

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const commentRepository = getRepository(Comment);
    try {
      const comment = await commentRepository.findOneOrFail(id);
      res.send(comment);
    } catch (error) {
      res.status(404).send('Comment not found');
    }
  };

  public static editComment = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { text } = req.body;
    const commentRepository = getRepository(Comment);
    let comment;
    try {
      comment = await commentRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Comment not found');
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
      res.status(500).send('Sorry, something went wrong 😿');
      return;
    }
    res.status(204).send();
  };

  public static deleteComment = async (req: Request, res: Response) => {
    const id = req.params.id;
    const commentRepository = getRepository(Comment);
    let comment: Comment;
    try {
      comment = await commentRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Sorry, comment does not exist in the first place 😿');
      return;
    }
    commentRepository.delete(id);
    res.status(204).send('Comment deleted');
  };
}

export default CommentController;
