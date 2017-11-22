import fetch from 'node-fetch';
import _ from "lodash";

class DataUpdater {
    static async run () {
        return await DataUpdater.faculties();
    }
    static async faculties () {
        const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_FACULTIES_JSON').then(r => r.json());
        let facultiesArray = _.get(fac, 'university.faculties', []);
        let departments = await Promise.all(
            facultiesArray.map(facultet => fetch(`http://cist.nure.ua/ias/app/tt/P_API_DEPARTMENTS_JSON?p_id_faculty=${facultet.id}`).then(r => r.json()).catch(e => e))
        );
        let directions = await Promise.all(
            facultiesArray.map(facultet => fetch(`http://cist.nure.ua/ias/app/tt/P_API_DIRECTIONS_JSON?p_id_faculty=${facultet.id}`).then(r => r.json()))
        );
        return departments;
    }
    static async teachers () {
        const teachersData = [];
        const departments = [];
        const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_PODR_JSON').then(r => r.json());
        let faculties = _.get(fac, 'university.faculties',[]);
        faculties.forEach(facultet => {
            departments.push(...facultet.departments);
        });
        departments.forEach(department => {
            department.teachers.forEach(teacher => {
                teachersData.push(Object.assign({}, teacher, { "department_id": department.id }));
            })
        })
        return teachersData;
    }
    static async groups () {
        const groupsData = [];
        const directions = [];
        const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_GROUP_JSON').then(r => r.json());
        let faculties = _.get(fac, 'university.faculties', []);
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
    static async events (id) {
        const fac = await fetch(`http://cist.nure.ua/ias/app/tt/P_API_EVENT_JSON?timetable_id=${id}`);
        const facJS = await fac.json();
        return facJS;
    }
}

export default DataUpdater;