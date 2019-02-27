import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Link from './entity/Link';
import bodyParser from 'body-parser'
const app = express();
const port = process.env.PORT || 3000;



createConnection().then(async (connection) => {
  const app = express();
  app.use(bodyParser());
  app.get('/', (req, res) => res.send("This is Stephanie's first backend app with TypeORM and Postgres"));
  app.post('/create', async (req, res) => {
    console.log(req.body)
    const link = new Link();
    link.title = req.body.title;
    link.url = req.body.url;
    await connection.manager.save(link);
    res.send(link);
  });
  app.get('/read', async (req, res) => {
    const links = await connection.manager.find(Link);
    res.send(links);
  });
  app.listen(port, () => console.log(`I am listening on port ${port}!!! 😸`));
}).catch((error) => console.log(error));