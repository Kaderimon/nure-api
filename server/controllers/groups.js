import Group from '../models/group';

export async function getGroups() {
  return await Group.find();
}

export async function getGroup(groupId) {
  return await Group.findOne({id: groupId});
}
export async function setGroup(groups) {
  return await Group.create(groups);
}
export async function updateGroup(group) {
  return await Group.update({id: group.id}, group, {upsert: true})
}