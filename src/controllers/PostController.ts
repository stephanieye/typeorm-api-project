import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { Post } from '../entity/Post';
import { User } from '../entity/User';

class PostController {
  public static listAll = async (req: Request, res: Response) => {
    const postRepository = getRepository(Post);
    const posts = await postRepository.find();
    res.send(posts);
  };

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const postRepository = getRepository(Post);
    try {
      const post = await postRepository.findOneOrFail(id);
      res.send(post);
    } catch (error) {
      res.status(404).send('Post not found');
    }
  };

  public static newPost = async (req: Request, res: Response) => {
    const currentUserId = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(currentUserId);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    const { title, url, text } = req.body;
    if (url && text) {
      res.status(400).send('Sorry, you can either post a url or text, not both! 😾');
      return;
    }
    const post = new Post();
    post.title = title;
    post.url = url || '';
    post.text = text || '';
    post.user = user;
    const errors = await validate(post);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    const postRepository = getRepository(Post);
    try {
      await postRepository.save(post);
    } catch (e) {
      console.log(e);
      res.status(500).send('Sorry, something went wrong 😿');
      return;
    }
    res.status(201).send('Post created');
  };

  public static editPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, url, text } = req.body;
    if (url && text) {
      res.status(400).send('Sorry, you can either post a url or text, not both! 😾');
      return;
    }
    const postRepository = getRepository(Post);
    let post;
    try {
      post = await postRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Post not found');
      return;
    }
    post.title = title;
    post.url = url || '';
    post.text = text || '';
    const errors = await validate(post);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    try {
      await postRepository.save(post);
    } catch (e) {
      res.status(500).send('Sorry, something went wrong 😿');
      return;
    }
    res.status(204).send();
  };

  public static deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const postRepository = getRepository(Post);
    let post: Post;
    try {
      post = await postRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Sorry, post does not exist in the first place 😿');
      return;
    }
    postRepository.delete(id);
    res.status(204).send('Post deleted');
  };

  public static listAllComments = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const commentRepository = getRepository(Comment);
    try {
      const comments = await commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .where('comment.post.id = :id', { id })
        .getMany();
      res.send(comments);
    } catch (error) {
      res.status(404).send('Comments not found for this post');
    }
  };

  public static newComment = async (req: Request, res: Response) => {
    const currentPostId = req.params.id;
    const currentUserId = res.locals.jwtPayload.userId;
    const postRepository = getRepository(Post);
    let post;
    try {
      post = await postRepository.findOneOrFail(currentPostId);
    } catch (error) {
      res.status(404).send('Post not found');
      return;
    }
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(currentUserId);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    const { text } = req.body;
    const comment = new Comment();
    comment.text = text;
    comment.user = user;
    comment.post = post;
    const errors = await validate(comment);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    const commentRepository = getRepository(Comment);
    try {
      await commentRepository.save(comment);
    } catch (e) {
      console.log(e);
      res.status(500).send('Sorry, something went wrong 😿');
      return;
    }
    res.status(201).send('Comment created');
  };
}

export default PostController;
