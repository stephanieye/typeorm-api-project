import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import bodyParser from 'body-parser'
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

const port = process.env.PORT || 3000;

createConnection().then(async () => {

  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use("/", routes);
  
  app.listen(port, () => console.log(`I am listening on port ${port} 😸`));
}).catch((error) => console.log(error));