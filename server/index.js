'use strict';
import Koa from 'koa';
import logger from'koa-logger';
import err from './middleware/error';
import config from './config/config';
import {routes, allowedMethods} from './routes/index.js';
import { db } from './services/dbConnect'
const app = new Koa();

app.use(logger());
app.use(err);


app.use(routes());
app.use(allowedMethods());


app.listen(config.port, function () {
  console.log('%s listening at port %d', 'nureApi', config.port);
});