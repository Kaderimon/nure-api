//work with db
import DataUpdater from '../services/dataupdater.js';
import { getFaculties,
    updateFacultet,
    setFacultet} from './faculties'
import { getGroups, getGroup, setGroup, updateGroup, getGroupsByDirection } from './groups';
import { getTeachers, getTeacher, setTeachers, updateTeacher, getTeachersByDepartment } from './teachers';
import { updateEvent, getEvent } from './events';

export function updateDB() {
    DataUpdater.run();
}
export async function groupEvents(id) {
    return await DataUpdater.events(id, 'group');
}
export async function teacherEvents(id) {
    return await DataUpdater.events(id, 'teacher');
}
export async function updateFaculties() {
    return await DataUpdater.faculties();
}
export async function updateGroups() {
    return await DataUpdater.groups();
}
export async function updateTeachers() {
    return await DataUpdater.teachers();
}
export { getFaculties,
    setFacultet,
    updateFacultet,
    getGroups,
    getGroup,
    setGroup,
    updateGroup,
    getTeachers,
    getTeacher,
    setTeachers,
    updateTeacher,
    updateEvent,
    getEvent,
    getTeachersByDepartment,
    getGroupsByDirection };