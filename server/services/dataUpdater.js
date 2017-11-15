import fetch from 'node-fetch';
import _ from "lodash";

class DataUpdater {
    static async run () {
        return await DataUpdater.faculties();
    }
    static async faculties () {
       const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_FACULTIES_JSON');
       const facJS = await fac.json();
       return facJS;
    }
    static async teachers () {
        const teachersData = [];
        const departments = [];
        const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_PODR_JSON');
        const facJS = await fac.json();
        let faculties = _.get(facJS, 'university.faculties',[])
        faculties.forEach(element => {
            departments.push(...element.departments);
        });
        departments.forEach(element => {
            teachersData.push(...element.teachers)
        })
        return teachersData;
    }
    static async groups () {
        const groupsData = [];
        const directions = [];
        const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_GROUP_JSON');
        const facJS = await fac.json();
        let faculties = _.get(facJS, 'university.faculties',[])
        faculties.forEach(element => {
            directions.push(...element.directions);
        });
        console.log(directions);
        directions.forEach(element => {
            groupsData.push(...element.groups || [])
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