import { Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";

class UserController{

static listAll = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.posts", "post")
    .leftJoinAndSelect("user.comments", "comment")
    .getMany();
    res.send(users);
  } catch (error) {
    res.status(404).send();
  }
};

static getOneById = async (req: Request, res: Response) => {
  const id: number = req.params.id;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.posts", "post")
    .leftJoinAndSelect("user.comments", "comment")
    .where("user.id = :id", { id: id })
    .getOne();
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
};

static newUser = async (req: Request, res: Response) => {
  let { username, password } = req.body;
  let user = new User();
  user.username = username;
  user.password = password;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  user.hashPassword();
  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("Sorry, this username already exists 😿");
    return;
  }
  res.status(201).send("User created");
};

static editUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { username } = req.body;
  const userRepository = getRepository(User);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  user.username = username;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("Sorry, this username already exists 😿");
    return;
  }
  res.status(204).send();
};

static deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  userRepository.delete(id);
  res.status(204).send('Goodbye!');
};
};

export default UserController;