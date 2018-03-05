import Group from '../models/group';
import DefaultError from '../errors/Default';

export async function getGroups() {
  return await Group.find();
}
export async function getGroup(groupId) {
  return await Group.findOne({id: groupId}).then(function(group) {
    if(!group) {
      throw new DefaultError('Группа не найдена', 404);
    }
    return group;
  });
}
export async function setGroup(groups) {
  return await Group.create(groups);
}
export async function getGroupsByDirection(dir) {
  return await Group.find({direction_id: dir});
}
export async function updateGroup(group) {
  return await Group.update({id: group.id}, group, {upsert: true})
}