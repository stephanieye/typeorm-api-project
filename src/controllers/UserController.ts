import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";

class UserController{

static listAll = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ["id", "username", "role"]
  });
  res.send(users);
};

static getOneById = async (req: Request, res: Response) => {
  const id: number = req.params.id;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ["id", "username", "role"]
    });
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
};

static newUser = async (req: Request, res: Response) => {
  let { username, password, role } = req.body;
  let user = new User();
  user.username = username;
  user.password = password;
  user.role = role;
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
  const { username, role } = req.body;
  const userRepository = getRepository(User);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Sorry, user not found 😿");
    return;
  }
  user.username = username;
  user.role = role;
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
    res.status(404).send("Sorry, user not found 😿");
    return;
  }
  userRepository.delete(id);
  res.status(204).send();
};
};

export default UserController;