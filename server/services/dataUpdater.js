import fetch from 'node-fetch';
import _ from "lodash";
import { setTeachers, updateTeacher } from '../controllers/index.js'
import config from '../config/config'

class DataUpdater {
    static async run () {
        return await DataUpdater.teachers();
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
        return departments;
    }
    static async teachers () {
        const teachersData = [];
        const departments = [];
        const data = await fetch(`${config.apiSource}/P_API_PODR_JSON`).then(r => r.json());
        let faculties = _.get(data, 'university.faculties',[]);
        faculties.forEach(facultet => {
            departments.push(...facultet.departments);
        });
        departments.forEach(department => {
            department.teachers.forEach(teacher => {
                teachersData.push(Object.assign({}, teacher, { "department_id": department.id }));
            })
        })
        return teachersData.map(async item => {
            return await updateTeacher(item);
        });
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

        return { id, events };
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
        return groupsData;
    }
}

export default DataUpdater;