//work with db
import DataUpdater from '../services/dataupdater.js';
import { getFaculties,
    getFacultet,
    setFacultet,
    updateFaculties} from './faculties'
import { getGroups, setGroup, updateGroup } from './groups';
import { getTeachers, getTeacher, setTeachers } from './teachers';


export async function updateDB() {
    await DataUpdater.run();
}
export async function groupEvents(id) {
    return await DataUpdater.events(id, 'group');
}
export async function teacherEvents(id) {
    return await DataUpdater.events(id, 'teacher');
}
export { getFaculties,
    getFacultet,
    setFacultet,
    updateFaculties,
    getGroups,
    setGroup,
    updateGroup,
    getTeachers,
    getTeacher,
    setTeachers };