import Router from 'koa-router';
import fetch from 'node-fetch';
//import product from '../models/product';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import { refetchData } from '../controllers/index.js'

const router = new Router({
  prefix: '/api'
});
const koaBody = convert(KoaBody());

router
  .get('/faculties', async (ctx, next) => {
    ctx.body = await DataUpdater.faculties();
  })
  .get('/faculties:/id', async (ctx, next) => {
    ctx.body = await DataUpdater.faculties();
  })
  .get('/departments', async (ctx, next) => {
    ctx.body = await DataUpdater.faculties();
  })
  .get('/departments:/id', async (ctx, next) => {
    ctx.body = await DataUpdater.faculties();
  })
  .get('/update', async (ctx, next) => {
    let result = await updateDB();
    if (result) {
      ctx.body = result
    } else {
      ctx.status = 204
    }
  })
  .get('/teachers', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await DataUpdater.teachers();
  })
  .get('/teachers/:id', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await DataUpdater.teachers();
  })
  .get('/groups', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await DataUpdater.groups();
  })
  .get('/groups/:id', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await DataUpdater.groups();
  })
  .get('/events/:id', async (ctx, next) => {
    ctx.status = 204;
    await product.delete(ctx.params.id);
  });

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }