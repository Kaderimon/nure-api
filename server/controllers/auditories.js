import Auditory from '../models/auditory';
import DefaultError from '../errors/Default';

export async function getAuditories() {
  return await Auditory.find();
}
export async function getAuditory(id) {
  return await Auditory.findOne({id: id}).then(function(auditory) {
    if(!auditory) {
      throw new DefaultError('Аудитория не найдена', 404);
    }
    return auditory;
  });
}
export async function setAuditory(auditories) {
  return await Auditory.create(auditories);
}
export async function getAuditoriesByShortName(name) {
  return await Auditory.find({short_name: name});
}
export async function updateAuditory(group) {
  return await Auditory.update({id: group.id}, group, {upsert: true})
}