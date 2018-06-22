import "reflect-metadata";
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import 'inversify-express-doc';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import * as bodyParser from 'body-parser';
import { TYPES } from "./models/types"
import { IApplicationService } from "./services/application/application.service.models";
import { ApplicationService } from "./services/application/application.service"
import {CustomAuthProvider} from "./services/auth/auth.provider";
import "./controllers/application/application.controller";
import { IDB } from "src/services/DB/db.test.models";
import { DB } from "./services/DB/db.service.test";
import { IAuthService } from "./services/auth/auth.models";
import { AuthService } from "./services/auth/auth.services";
import { load } from "inversify-express-doc";

// set up container
let container: Container = new Container();

// set up bindings
container.bind<IApplicationService>(TYPES.IApplicationService).to(ApplicationService);
container.bind<IDB>(TYPES.IDB).to(DB);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

// create server
let server = new InversifyExpressServer(container, null,{ rootPath: "/api/v1/" },null,CustomAuthProvider);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  var logger = morgan('combined',
    {
      stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    });
  app.use(logger);
});

let app = server.build();
app.listen(3000);

console.log(`running on port 3000 started at ${new Date().toLocaleString()}`)