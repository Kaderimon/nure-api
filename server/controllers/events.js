import EventModel from '../models/event';

export async function getEvent(id) {
  return await EventModel.findOne({id: id});
}
export async function setEvent(data) {
  return await EventModel.create(data);
}
export async function updateEvent(target) {
  return await EventModel.update({id: target.id}, target, {upsert: true})
}