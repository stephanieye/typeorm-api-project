import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Link from './entity/Link';
import bodyParser from 'body-parser'
import {getManager, getRepository} from "typeorm";

const port = process.env.PORT || 3000;

createConnection().then(async (connection) => {

  const app = express();
  app.use(bodyParser.json());
  app.get('/', (req, res) => res.send("This is Stephanie's first backend app with TypeORM and Postgres"));
  
  app.post('/links', async (req, res) => {
    const link = new Link();
    link.title = req.body.title;
    link.url = req.body.url;
    await getManager().save(link);
    res.send(link);
  });
  
  app.get('/links', async (req, res) => {
    console.log('i the connection', connection)
    const links = await getManager().find(Link);
    res.send(links);
  });

  app.get('/links/:id', async (req, res) => {
    console.log(req.params)
    const link = await getRepository(Link).findOne(req.params.id);
    res.send(link);
  });
  
  app.put("/links/:id", async (req, res) => {
    const link = await getRepository(Link).findOne(req.params.id);
    link.title = req.body.title || link.title
    link.url = req.body.url || link.url
    await getManager().save(link);
    res.send(link);
});
  
  
  app.listen(port, () => console.log(`I am listening on port ${port}!!! 😸`));
}).catch((error) => console.log(error));