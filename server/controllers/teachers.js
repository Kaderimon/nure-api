import Teacher from '../models/teacher';

export async function getTeacher(id) {
  return await Teacher.find({id: id});
}
export async function getTeachers() {
  return await Teacher.find();
}
export async function setTeachers(teachers) {
  return await Teacher.create(teachers)
    .then(teachers => console.log(teachers));
}
export async function updateTeacher(id) {
    
}