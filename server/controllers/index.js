//work with db
import DataUpdater from '../services/dataupdater.js';
import { getFaculties,
    getFacultet,
    setFacultet,
    updateFaculties} from './faculties'
import { getGroups, setGroup, updateGroup } from './groups';
import { getTeachers, getTeacher, setTeachers, updateTeacher } from './teachers';


export async function updateDB() {
    await DataUpdater.run();
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
    setTeachers,
    updateTeacher };