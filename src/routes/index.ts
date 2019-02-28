import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import link from "./link";

const routes = Router();

routes.get('/', (req, res) => res.send("This is Stephanie's first backend app with TypeORM and Postgres"));

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/links", link);

export default routes;