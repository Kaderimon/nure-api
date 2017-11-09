import fetch from 'node-fetch';

class DataUpdater {
    static async run () {
        await DataUpdater.faculties();
        console.log('fuck yeah');
    }
    static async faculties () {
       const fac = await fetch('http://cist.nure.ua/ias/app/tt/get_faculties');
       const facJS = await fac.json();
       console.log(facJS);
    }
}

export default DataUpdater;