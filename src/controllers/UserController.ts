import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from "../repositories/UserRepository";

function generateToken({ id, email }) {
  return (
    jwt.sign({
      id,
      email
    }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 1 day
    })
  );
}

class UserController {

  async list(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UserRepository);
    const users = await usersRepository.find();
    res.json(users);
  }

  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const usersRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        error: "User already exists!"
      });
    }

    const hash_password = await bcrypt.hash(password, 10);

    const user = usersRepository.create({
      email, password: hash_password
    });

    await usersRepository.save(user);

    user.password = undefined;

    const token = generateToken(user);

    return res.status(201).json({ user, token });
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.createQueryBuilder("users")
      .addSelect('users.password')
      .where("users.email = :email", { email })
      .getOne();

    if (!user) {
      return res.status(400).json({
        error: "User not found!"
      });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({
        error: "Invalid credentials!"
      });
    }

    user.password = undefined;

    const token = generateToken(user);

    return res.status(201).json({ user, token });
  }
}

export { UserController };
