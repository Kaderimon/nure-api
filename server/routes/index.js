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
    const faculties = await fetch('http://cist.nure.ua/ias/app/tt/get_faculties');
    ctx.body = await faculties.json();
  })
  .get('/update', async (ctx, next) => {
    //let result = await product.get(ctx.params.id);
    refetchData();
    if (result) {
      ctx.body = result
    } else {
      ctx.status = 204
    }
  })
  .post('/product', koaBody, async (ctx, next) => {
    ctx.status = 201;
    //ctx.body = await product.create(ctx.request.body)
  })
  .put('/product/:id', koaBody, async (ctx, next) => {
    ctx.status = 204;
    //await product.update(ctx.params.id, ctx.request.body);
  })
  .delete('/product/:id', async (ctx, next) => {
    ctx.status = 204;
    //await product.delete(ctx.params.id);
  });

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }