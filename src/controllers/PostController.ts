import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Post } from "../entity/Post";

class PostController{

static listAll = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  const posts = await postRepository.find();
  res.send(posts);
};

static getOneById = async (req: Request, res: Response) => {
  const id: number = req.params.id;
  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOneOrFail(id);
    res.send(post);
  } catch (error) {
    res.status(404).send("Post not found");
  }
};

static newPost = async (req: Request, res: Response) => {
  const currentUserId = res.locals.jwtPayload.userId;
  let { title, url, text } = req.body;
  let post = new Post();
  post.title = title;
  post.url = url || '';
  post.text = text || '';
  post.authorId = currentUserId
  const errors = await validate(post);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  const postRepository = getRepository(Post);
  try {
    await postRepository.save(post);
  } catch (e) {
    console.log(e)
    res.status(500).send("Sorry, something went wrong 😿");
    return;
  }
  res.status(201).send("Post created");
};

static editPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, url, text } = req.body;
  const postRepository = getRepository(Post);
  let post;
  try {
    post = await postRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Sorry, post not found 😿");
    return;
  }
  post.title = title;
  post.url = url;
  post.text = text;
  const errors = await validate(post);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  try {
    await postRepository.save(post);
  } catch (e) {
    res.status(500).send("Sorry, something went wrong 😿");
    return;
  }
  res.status(204).send();
};

static deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const postRepository = getRepository(Post);
  let post: Post;
  try {
    post = await postRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Sorry, post does not exist in the first place 😿");
    return;
  }
  postRepository.delete(id);
  res.status(204).send();
};
};

export default PostController;