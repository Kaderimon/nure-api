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
  updateTeacherEvents,
  updateGroupEvents,
  getEvent,
  updateGroups,
  updateTeachers,
  getTeachersByDepartment,
  getGroupsByDirection, 
  getAuditories,
  getAuditory,
  updateAuditories,
  updateAuditoryEvents,
  findFreeAuditory} from '../controllers/index.js'
import moment from 'moment';
  
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
  .get('/teachers/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getTeacher(ctx.params.id);
  })
  .get('/teachers/department/:id', async (ctx, next) => {
    ctx.body = await getTeachersByDepartment(ctx.params.id);
    ctx.status = 201;
  })
  .post('/teachers', async (ctx, next) => {
    ctx.body = await updateTeachers();
    ctx.status = 201;
  })
  .post('/teachers/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await updateTeacherEvents(ctx.params.id);
  })
  .get('/groups', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getGroups();
  })
  .get('/groups/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getGroup(ctx.params.id);
  })
  .get('/groups/direction/:id', async (ctx, next) => {
    ctx.body = await getGroupsByDirection(ctx.params.id);
    ctx.status = 201;
  })
  .post('/groups', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await updateGroups();
  })
  .post('/groups/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await updateGroupEvents(ctx.params.id);
  })
  .get('/auditories', async (ctx, next) => {
    ctx.body = await getAuditories();
    ctx.status = 201;
  })
  .get('/auditories/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getAuditory(ctx.params.id);
  })
  .post('/auditories', async (ctx, next) => {
    ctx.body = await updateAuditories();
    ctx.status = 201;
  })
  .post('/auditories/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await updateAuditoryEvents(ctx.params.id);
  })
  .post('/findFreeAuditory', koaBody, async (ctx, next) => {
    ctx.body = await findFreeAuditory(moment(ctx.request.body.date));
    ctx.status = 201;
  })
  .get('/events/:id', async (ctx, next) => {
    ctx.status = 201;
    ctx.body = await getEvent(ctx.params.id);
  })
export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }