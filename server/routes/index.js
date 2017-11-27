import Router from 'koa-router';
import fetch from 'node-fetch';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import { updateDB,
  getFaculties,
  updateFaculties,
  getTeachers,
  getTeacher,
  getGroups,
  teacherEvents,
  groupEvents} from '../controllers/index.js'
  
const router = new Router({
  prefix: '/api'
});
const koaBody = convert(KoaBody());

router
  .get('/faculties', async (ctx, next) => {
    ctx.body = await getFaculties();
  })
  .post('/faculties', async (ctx, next) => {
    ctx.body = await updateFaculties();
  })
  .get('/update', async (ctx, next) => {
    let result = await updateDB();
    if (result) {
      ctx.body = result
    } else {
      ctx.status = 204
    }
  })
  .get('/teachers', async (ctx, next) => {
    ctx.body = await getTeachers();
    ctx.status = 201;
  })
  .get('/teachers/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getTeacher(ctx.params.id);
  })
  .post('/teachers/:id', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await teacherEvents(ctx.params.id);
  })
  .get('/groups', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getGroups();
  })
  .get('/groups/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getGroups(ctx.params.id);
  })
  .post('/groups/:id', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await groupEvents(ctx.params.id);
  })

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }