import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Todo from './entity/Todo';
const app = express();
const port = process.env.PORT || 3000;



createConnection().then(async (connection) => {
  const app = express();
  app.get('/', (req, res) => res.send("This is Stephanie's first backend app with TypeORM and Postgres"));
  app.get('/create', async (req, res) => {
    const todo = new Todo();
    todo.name = 'A Todo';
    await connection.manager.save(todo);
    res.send(todo);
  });
  app.get('/read', async (req, res) => {
    const todos = await connection.manager.find(Todo);
    res.send(todos);
  });
  app.listen(port, () => console.log(`I am listening on port ${port}!!! 😸`));
}).catch((error) => console.log(error));