import Teacher from '../models/teacher';

export async function getTeacher(id) {
  return await Teacher.find({id: id});
}
export async function getTeachers() {
  return await Teacher.find();
}
export async function setTeachers(teachers) {
  return await Teacher.create(teachers);
}
export async function updateTeacher(teacher) {
  return await Teacher.update({id: teacher.id}, teacher, {upsert: true})
}