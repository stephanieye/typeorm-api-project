import { Request, Response, Router } from 'express';
import auth from './auth';
import comment from './comment';
import post from './post';
import user from './user';

const routes = Router();

routes.get('/', (req, res) =>
  res.send(
    'This is a basic Hacker News API clone using TypeScript, Node.js, TypeORM and PostgreSQL'
  )
);

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/posts', post);
routes.use('/comments', comment);

export default routes;
