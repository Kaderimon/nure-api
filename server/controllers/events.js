import EventModel from '../models/event';

export async function getEvent(id) {
  return await EventModel.findOne({id: id}).then(function(user) {
    if(!user) {
      throw new Error('Расписание не загружено. Пожалуйста обновите!')
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
      throw new Error('Произошла ошибка при обновлении')
    }
    return getEvent(target.id);
  });
}