//work with db
import DataUpdater from '../services/dataUpdater.js';
import { getFaculties,
    updateFacultet,
    setFacultet} from './faculties'
import { getGroups, getGroup, setGroup, updateGroup, getGroupsByDirection } from './groups';
import { getTeachers, getTeacher, setTeachers, updateTeacher, getTeachersByDepartment } from './teachers';
import { updateEvent, getEvent } from './events';
import { getAuditories, getAuditoriesByShortName, setAuditory, updateAuditory, getAuditory } from './auditories.js';

export function updateDB() {
    DataUpdater.run();
}
export async function updateGroupEvents(id) {
    return await DataUpdater.events(id, 'group');
}
export async function updateTeacherEvents(id) {
    return await DataUpdater.events(id, 'teacher');
}
export async function updateAuditoryEvents(id) {
    return await DataUpdater.events(id, 'auditory');
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
export async function updateAuditories() {
    return await DataUpdater.auditories();
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
    getGroupsByDirection,
    getAuditories,
    getAuditory,
    getAuditoriesByShortName,
    setAuditory,
    updateAuditory };