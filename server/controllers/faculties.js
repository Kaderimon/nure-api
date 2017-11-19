import Facultet from '../models/facultet';

export async function getFaculties() {
  return await Facultet.find();
}
export async function getFaculty(id) {
    
}
export async function setFacultet(data) {
  return await Facultet.create(data);
}
export async function updateFaculties() {
    
}