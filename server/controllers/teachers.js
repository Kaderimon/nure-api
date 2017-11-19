import Teacher from '../models/teacher';

export async function getTeachers() {
  return await Teacher.find();
}
export async function setTeachers(teachers) {
  return await Teacher.create(teachers);
}
export async function updateTeacher(id) {
    
}