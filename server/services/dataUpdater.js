import fetch from 'node-fetch';
import _ from "lodash";
import { updateTeacher, updateGroup, updateFacultet, updateEvent, updateAuditory } from '../controllers/index.js'
import config from '../config/config'
import moment from 'moment';
import 'moment/locale/ru';
import DefaultError from '../errors/Default';

moment.locale('ru');
class DataUpdater {
    static async run () {
        try {
            await DataUpdater.teachers();
            await DataUpdater.groups();
            await DataUpdater.faculties();            
        } catch (err) {
            throw new DefaultError(err);
        }
        return {
            message: 'Success',
            sync: moment().format('llll')
        }
    }
    static async faculties () {
        const data = await fetch(`${config.apiSource}/P_API_FACULTIES_JSON`).then(r => r.json());
        let facultiesArray = _.get(data, 'university.faculties', []);
        let departments = await Promise.all(
            facultiesArray.map(facultet => fetch(`${config.apiSource}/P_API_DEPARTMENTS_JSON?p_id_faculty=${facultet.id}`).then(r => r.json()).catch(e => e))
        );
        let directions = await Promise.all(
            facultiesArray.map(facultet => fetch(`${config.apiSource}/P_API_DIRECTIONS_JSON?p_id_faculty=${facultet.id}`).then(r => r.json()))
        );
        facultiesArray.forEach((currentValue, index, array) => {
            array[index].directions = directions[index].faculty.directions;
            array[index].departments = _.get(departments[index], 'faculty.departments', []);
        });
        try {
            await Promise.all(facultiesArray.map(async item => {
                return await updateFacultet(item);
            }));
        } catch (err) {
            throw new DefaultError(err);
        }
        return {
            message: 'База факультетов успешно обновлена',
            sync: moment().format('llll')
        }
    }
    static async teachers () {
        const teachersData = [];
        const departments = [];
        const data = await fetch(`${config.apiSource}/P_API_PODR_JSON`).then(r => r.json());
        let faculties = _.get(data, 'university.faculties', []);
        faculties.forEach(facultet => {
            departments.push(...facultet.departments);
        });
        departments.forEach(department => {
            department.teachers.forEach(teacher => {
                teachersData.push(Object.assign({}, teacher, { "department_id": department.id }));
            })
        })
        try {
            await Promise.all(teachersData.map(async item => {
                return await updateTeacher(item);
            }));
        } catch (err) {
            throw new DefaultError(err);
        }
        return {
            message: 'База преподавателей успешно обновлена',
            sync: moment().format('llll')
        }
    }
    static async events (id, target) {
        const data = await fetch(`${config.apiSource}/P_API_EVENTS_${target}_JSON?p_id_${target}=${id}`)
            .then(r => r.json());
        const events = _.get(data, 'events', []);
        events.forEach((item, index, arr) => {
            const groups = item.groups.map(i => _.find(_.get(data, 'groups', []), {'id': i}));
            const teachers = item.teachers.map(i => _.find(_.get(data, 'teachers', []), {'id': i}));
            const type = _.find(_.get(data, 'types', []), {'id': item.type});
            const subject = _.find(_.get(data, 'subjects', []), {'id': item.subject_id});
            arr[index].groups = groups;
            arr[index].teachers = teachers;
            arr[index].type = type;
            arr[index].subject = subject;
            delete arr[index].subject_id;
        });
        const eventData = { id, events, sync: moment().format('llll')};
        return updateEvent(eventData);
    }
    static async groups () {
        const groupsData = [];
        const directions = [];
        const data = await fetch(`${config.apiSource}/P_API_GROUP_JSON`).then(r => r.json());
        let faculties = _.get(data, 'university.faculties', []);
        faculties.forEach(facultet => {
            directions.push(...facultet.directions);
        });
        directions.forEach(direction => {
            _.get(direction,'groups',[]).forEach(group => {
                groupsData.push(Object.assign({}, group, { "direction_id": direction.id }));
            })
            _.get(direction,'specialities',[]).forEach(speciality => {
                speciality.groups.forEach(group => {
                    groupsData.push(Object.assign({}, group, { "direction_id": direction.id }));
                })
            });
        })
        try {
            await Promise.all(groupsData.map(async item => {
                return await updateGroup(item);
            }));
        } catch (err) {
            throw new DefaultError(err);
        }
        return {
            message: 'База групп успешно обновлена',
            sync: moment().format('llll')
        }
    }
    static async auditories () {
        const auditories = [];
        const data = await fetch(`${config.apiSource}/P_API_AUDITORIES_JSON`).then(r => r.json());
        let buildings = _.get(data, 'university.buildings', []);
        buildings.forEach(building => {
            auditories.push(...building.auditories);
        });
        try {
            auditories.map(async item => {
                return await updateAuditory(item);
            });
        } catch (err) {
            throw new DefaultError(err);
        }
        return {
            message: 'База аудиторий успешно обновлена',
            sync: moment().format('llll')
        }
    }
}

export default DataUpdater;