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
  getGroup,
  teacherEvents,
  groupEvents,
  getEvent,
  updateGroups,
  updateTeachers } from '../controllers/index.js'
  
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
    ctx.body = result
    ctx.status = 201;
  })
  .get('/teachers', async (ctx, next) => {
    ctx.body = await getTeachers();
    ctx.status = 201;
  })
  .post('/teachers', async (ctx, next) => {
    ctx.body = await updateTeachers();
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
  .post('/groups', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await updateGroups();
  })
  .get('/groups/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getGroup(ctx.params.id);
  })
  .post('/groups/:id', koaBody, async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await groupEvents(ctx.params.id);
  })
  .get('/events/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getEvent(ctx.params.id);
  })
export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }