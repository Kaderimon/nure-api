import Router from 'koa-router';
import fetch from 'node-fetch';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import { updateDB, getFaculties, getFacultet, getTeachers, getTeacher, getGroups } from '../controllers/index.js'
const router = new Router({
  prefix: '/api'
});
const koaBody = convert(KoaBody());

router
  .get('/faculties', async (ctx, next) => {
    ctx.body = await getFaculties();
  })
  .get('/faculties:/id', async (ctx, next) => {
    ctx.body = await getFacultet();
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
    ctx.body = await getTeachers();
    ctx.status = 201;
  })
  .get('/teachers/:id', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getTeacher();
  })
  .get('/groups', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getGroups();
  })
  .get('/groups/:id', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getGroups();
  })
  .get('/events/:id', async (ctx, next) => {
    ctx.status = 204;
    ctx.body = await getEvent();
  });

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }