'use strict';
import Koa from 'koa';
import logger from'koa-logger';
import mangoose from'mongoose';
import err from './middleware/error';
import config from './config/config';
import {routes, allowedMethods} from './routes/index.js';

const app = new Koa();

app.use(logger());
app.use(err);

mangoose.connect(`${config.dbAddress}:${config.dbPort}`, {useMongoClient: true});
mangoose.Promise = global.Promise;
const db = mangoose.connection;
db.on('error', function() {
  console.log('connection error');
});
db.once('open', function() {
  console.log('Connected to DB');
});
app.use(routes());
app.use(allowedMethods());


app.listen(config.port, function () {
  console.log('%s listening at port %d', 'nureApi', config.port);
});