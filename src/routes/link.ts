import { Router } from "express";
import Link from '../entity/Link';
import {getManager, getRepository} from "typeorm";

  const router = Router();
  
  router.post('/', async (req, res) => {
    const link = new Link();
    link.title = req.body.title;
    link.url = req.body.url;
    await getManager().save(link);
    res.send(link);
  });
  
  router.get('/', async (req, res) => {
    const links = await getManager().find(Link);
    res.send(links);
  });

  router.get('/:id', async (req, res) => {
    const link = await getRepository(Link).findOne(req.params.id);
    res.send(link);
  });
  
  router.put("/:id", async (req, res) => {
    const link = await getRepository(Link).findOne(req.params.id);
    link.title = req.body.title || link.title
    link.url = req.body.url || link.url
    await getManager().save(link);
    res.send(link);
});

  router.delete(':id', async (req, res) => {
    const link = await getRepository(Link).findOne(req.params.id);
    await getManager().remove(link);
    res.send('Deleted 😿')
});

  export default router;