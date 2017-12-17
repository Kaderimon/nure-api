import Teacher from '../models/teacher';

export async function getTeacher(id) {
  return await Teacher.findOne({id: id});
}
export async function getTeachers() {
  return await Teacher.find();
}
export async function getTeachersByDepartment(dep) {
  return await Teacher.find({department_id: dep});
}
export async function setTeachers(teachers) {
  return await Teacher.create(teachers);
}
export async function updateTeacher(teacher) {
  return await Teacher.update({id: teacher.id}, teacher, {upsert: true})
}