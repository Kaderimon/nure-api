import fetch from 'node-fetch';

class DataUpdater {
    static async run () {
        await DataUpdater.faculties();
        console.log('fuck yeah');
    }
    static async faculties () {
       const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_FACULTIES_JSON');
       const facJS = await fac.json();
       console.log(facJS);
    }
    static async teachers () {
        const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_PODR_JSON');
        const facJS = await fac.json();
        console.log(facJS);
    }
    static async groups () {
        const fac = await fetch('http://cist.nure.ua/ias/app/tt/P_API_GROUP_JSON');
        const facJS = await fac.json();
        console.log(facJS);
    }
    static async events (id) {
        const fac = await fetch(`http://cist.nure.ua/ias/app/tt/P_API_EVENT_JSON?timetable_id=${id}`);
        const facJS = await fac.json();
        console.log(facJS);
    }
}

export default DataUpdater;