import EventModel from '../models/event';
import DefaultError from '../errors/Default';

export async function getEvent(id) {
  return await EventModel.findOne({id: id}).then(function(user) {
    if(!user) {
      throw new DefaultError('Расписание не загружено. Пожалуйста обновите!', 404)
    }
    return user;
  });
}
export async function setEvent(data) {
  return await EventModel.create(data);
}
export async function updateEvent(target) {
  return await EventModel.update({id: target.id}, target, {upsert: true}).then(function(user) {
    if(!user) {
      throw new DefaultError('Произошла ошибка при обновлении', 400)
    }
    return getEvent(target.id);
  });
}