import EventModel from '../models/event';
import DefaultError from '../errors/Default';
import _ from "lodash";
import { getAuditories } from '.';

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
export async function findFreeAuditory(searchingAuditoryTime) {
  const bookedAuditories = await EventModel.find({
    target: 'auditory',
    events: {
      $elemMatch: {
        start_time: {
          $lte: searchingAuditoryTime
        },
        end_time: {
          $gte: searchingAuditoryTime
        }
      }
    }
  });
  const allAuditories = await getAuditories();
  return _.differenceWith(allAuditories, bookedAuditories, (arrVal, otherVal) => arrVal.short_name === otherVal.events[0].auditory);
}