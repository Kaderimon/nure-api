'use strict';
import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import Router from 'koa-router';
import err from './middleware/error';
import config from './config/config';
import {routes, allowedMethods} from './routes/index.js';
import { db } from './services/dbConnect';
import cors from '@koa/cors';
const fs = require('fs');
const app = new Koa();
const router = new Router().get('/', async (ctx, next) => {
  const indexHTML = fs.readFileSync(__dirname + '/public/index.html', 'utf-8');

  ctx.body = indexHTML;
})
app.use(cors());
app.use(logger());
app.use(err);

app.use(serve(__dirname + '/../build'));
app.use(router.routes());
app.use(routes());
app.use(allowedMethods());


app.listen(config.port, function () {
  console.log('%s listening at port %d', 'nureApi', config.port);
});