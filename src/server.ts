import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import bodyParser from 'body-parser'
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import PostgressConnectionStringParser from "pg-connection-string";


const port = process.env.PORT || 3000;
 
const databaseUrl: string = process.env.DATABASE_URL;
let typeOrmOptions: any = null;

if (process.env.DATABASE_URL) {
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
typeOrmOptions = {
    type: "postgres",
    host: connectionOptions.host,
    port: connectionOptions.port,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: true,
    entities: ["target/entity/**/*.js"],
    extra: {
        ssl: true
    }
};
}

const connection = createConnection(typeOrmOptions);


connection.then(async () => {

  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use("/", routes);
  
  app.listen(port, () => console.log(`I am listening on port ${port} 😸`));
}).catch((error) => console.log(error));