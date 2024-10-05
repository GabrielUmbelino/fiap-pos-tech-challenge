import express from 'express';
import { Router, Request, Response } from 'express';

export const server = express();

const route = Router();

server.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

server.use(route);

